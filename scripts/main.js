import {initHeader} from './Header.js'
import {initPosts} from './Posts.js'
import { initVideoPlayer } from './VideoPlayer.js'
import { initSelect } from './Select.js'
import { initFeedbackForm } from './FeedBackForm.js'
import './Posts.js'
initHeader()
const destroyPosts = initPosts()
destroyPosts()
initPosts()
initVideoPlayer()
initSelect()
initFeedbackForm()