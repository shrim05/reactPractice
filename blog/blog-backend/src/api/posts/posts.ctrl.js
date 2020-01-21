import Post from '../../models/post';
import mongoose from 'mongoose';
import Joi from 'joi';

const {ObjectId} = mongoose.Types;

export const getPostById = async (ctx, next) => {
    const {id} = ctx.params;
    if(!ObjectId.isValid(id)){
        ctx.status = 400; //bad request
        return;
    }
    try{
        const post = await Post.findById(id);
        if(!post){
            ctx.status = 404;
            return;
        }
        ctx.state.post = post;
        return next();
    }catch(e){
        ctx.throw(500, e);
    }
};

export const checkOwnPost = (ctx, next) => {
    const {user, post} = ctx.state;
    if(post.user._id.toString() !== user._id){
        ctx.status = 403;
        return;
    }
    return next();
}

/*
post write
POST /api/posts {title, body}
*/
export const write = async ctx => {
    const schema = Joi.object().keys({
        //객체가 다음 필드를 가지고 있음을 검증
        title: Joi.string().required(),
        body: Joi.string().required(),
        tags: Joi.array().items(Joi.string()).required(),
    });
    //검증 실패 시 예외 처리
     const result = Joi.validate(ctx.request.body, schema);
     if(result.error){
         ctx.status = 400;
         ctx.body = result.error;
         return;
     }
    //REST API body location => ctx.request.body
    const {title, body, tags} = ctx.request.body;
    const post = new Post({
        title,
        body,
        tags,
        user: ctx.state.user,
    });
    try {
        await post.save();
        ctx.body = post;
    }catch(e){
        ctx.throw(500,e);
    }
};

/*
post list inquiry
GET /api/posts
*/
export const list = async ctx => {
    const page = parseInt(ctx.query.page || '1', 10);
    if(page<1){
        ctx.status = 400;
        return;
    }
    const {tag, username} = ctx.query;
    const query = {
        ...(username ? {'user.username':username}:{}),
        ...(tag ?{tags:tag}:{}),
    };

    try{
        const posts = await Post.find()
        .sort({_id:-1})
        .limit(10)
        .skip((page-1) * 10)
        //.lean() -> json 형태로 데이터 조회
        .exec();
        const postCount = await Post.countDocuments().exec();
        ctx.set('Last-Page', Math.ceil(postCount / 10));
        ctx.body = posts
            .map(post => post.toJSON())
            .map(post => ({
                ...post,
                body: 
                    post.body.length < 200 ? post.body : `${post.body.slice(0,200)}...`,
            }));
    }catch(e){
        ctx.throw(500, e);
    }
};

/*
post specific post inquiry
GET /api/posts/:id
*/
export const read = async ctx => {
  ctx.body = ctx.state.post;
};

/*
post delete
DELETE /api/posts/:id
*/
export const remove = async ctx => {
    const {id} = ctx.params;
    try{
        await Post.findByIdAndRemove(id).exec();
        ctx.status = 204; // No content
    }catch(e){
        throw(500,e);
    }
};

/*
post replace
PUT /api/posts/:id {title, body}
*/
// export const replace = ctx => {
//     //PUT 메서드는 전체 포스트 정보를 입력하여 데이터를 통째로 교체할 때 사용
//     const {id} = ctx.params;
//     const index = posts.findIndex(p => p.id.toString()===id);
//     if(index === -1){
//         ctx.status = 404;
//         ctx.body = {
//             message: 'there is no such post',
//         };
//         return;
//     }
//     posts[index] =  {
//         id,
//         ...ctx.request.body,
//     };
//     ctx.body = posts[index];
// }

/*
post update(specific field)
PATCH  /api/posts/:id {title, body}
*/
export const update = async ctx => {
    const {id} = ctx.params;
    const schema = Joi.object().keys({
        title: Joi.string(),
        body: Joi.string(),
    tags: Joi.array().items(Joi.string()),
    });
    const result = Joi.validate(ctx.request.body, schema);
    if(result.error){
        ctx.status = 400;
        ctx.body = result.error;
        return; 
    }
    try{
        const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
            new: true,
        }).exec();
        if(!post){
            ctx.status = 404;
            return;
        }
        ctx.body = post;
    }catch(e){
        throw(500,e);
    }
};

