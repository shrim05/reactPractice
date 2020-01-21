import Router from 'koa-router';
import * as postsCtrl from './posts.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn'

const posts = new Router();


posts.get('/', postsCtrl.list);
posts.post('/', checkLoggedIn, postsCtrl.write);

posts.get('/:id',postsCtrl.getPostById , postsCtrl.read);
posts.delete('/:id', checkLoggedIn, postsCtrl.checkOwnPost, postsCtrl.getPostById, postsCtrl.remove);
// posts.put('/:id', postsCtrl.replace);
posts.patch('/:id', checkLoggedIn, postsCtrl.checkOwnPost, postsCtrl.getPostById, postsCtrl.update);


export default posts;