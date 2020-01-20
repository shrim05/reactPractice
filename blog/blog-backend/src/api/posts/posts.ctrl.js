let postId = 1;

const posts = [
    {
        id: 1,
        title: 'title',
        body: 'body',
    },
];

/*
post write
POST /api/posts {title, body}
*/
exports.write = ctx => {
    //REST API body location => ctx.request.body
    const {title, body} = ctx.request.body;
    postId += 1;
    const post = {id: postId, title, body};
    posts.push(post);
    ctx.body = post;
};

/*
post list inquiry
GET /api/posts
*/
exports.list = ctx => {
    ctx.body = posts;
};

/*
post specific post inquiry
GET /api/posts/:id
*/
exports.read = ctx => {
    const {id} = ctx.params;
    //파라미터 값은 문자열이므로 비교를 위해 파라미터를 숫자로 변경 or 비교할 값을 string으로 변환
    const post = posts.find(p => p.id.toString()===id);
    if(!post){
        ctx.status = 404;
        ctx.body = {
            message : 'there is no such post',
        };
        return;
    }
    ctx.body = post;
}

/*
post delete
DELETE /api/posts/:id
*/
exports.remove = ctx => {
    const {id} = ctx.params;
    const index = posts.findIndex(p=> p.id.toString()===id);
    if(index === -1){
        ctx.status =404;
        ctx.body = {
            message: 'there is no such post',
        };
        return;
    }
    posts.splice(index, 1);
    ctx.status = 204; // No content
};

/*
post replace
PUT /api/posts/:id {title, body}
*/
exports.replace = ctx => {
    //PUT 메서드는 전체 포스트 정보를 입력하여 데이터를 통째로 교체할 때 사용
    const {id} = ctx.params;
    const index = posts.findIndex(p => p.id.toString()===id);
    if(index === -1){
        ctx.status = 404;
        ctx.body = {
            message: 'there is no such post',
        };
        return;
    }
    posts[index] =  {
        id,
        ...ctx.request.body,
    };
    ctx.body = posts[index];
}

/*
post update(specific field)
PATCH  /api/posts/:id {title, body}
*/
exports.update = ctx => {
    const {id} = ctx.params;
    const index = posts.findIndex(p => p.id.toString()===id);
    if(index === -1){
        ctx.status = 404;
        ctx.body = {
            message: 'there is no such post',
        };
        return;
    }
    posts[index] = {
        ...posts[index],
        ...ctx.request.body,
    };
    ctx.body = posts[index];
};

