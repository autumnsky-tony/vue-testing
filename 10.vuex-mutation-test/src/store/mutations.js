export default {
  // Fail Case
  // SET_POST() {

  // }
  SET_POST(state, { post }) {
    state.postIds.push(post.id)
    // post[post.id] = post; 와 같은 방식은 반응성 시스템을 고려해서 사용 X
    // https://vuejs.org/v2/guide/reactivity.html#Change-Detection-Caveats
    state.posts = { ...state.posts, [post.id]: post }
  }
}