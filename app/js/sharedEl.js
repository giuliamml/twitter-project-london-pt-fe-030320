const createDirectForm = () => {
    let directCommentForm = document.createElement('form')
    directCommentForm.className = 'direct_comment_form'

    let directCommentInput = document.createElement('input')
    directCommentInput.className = 'direct_comment_input'
    directCommentInput.setAttribute("type", "text")
    directCommentInput.placeholder = "Your Comment"

    let removeDivBtn = document.createElement('button')
    removeDivBtn.className = 'remove_div_btn'
    removeDivBtn.style.backgroundImage = "url('./images/Arrow 2.svg')";
    removeDivBtn.style.backgroundRepeat = "no-repeat";

    let directCommentSubmit = document.createElement('input')
    directCommentSubmit.className = 'direct_comment_submit'
    directCommentSubmit.setAttribute("type", "submit")
    directCommentSubmit.value = "Tweet";

    directCommentForm.append(directCommentInput, removeDivBtn, directCommentSubmit )

    return directCommentForm
}


export default {
    createDirectForm
}