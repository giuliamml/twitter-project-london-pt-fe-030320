const createDirectForm = () => {
    let commentForm = document.createElement('form')
    commentForm.className = 'direct_comment_form'

    let commentInput = document.createElement('input')
    commentInput.className = 'direct_comment_input'
    commentInput.setAttribute("type", "text")
    commentInput.placeholder = "Your Comment"

    let backBtn = document.createElement('button')
    backBtn.className = 'remove_div_btn'
    backBtn.style.backgroundImage = "url('./images/Arrow 2.svg')";
    backBtn.style.backgroundRepeat = "no-repeat";

    let commentSubmit = document.createElement('input')
    commentSubmit.className = 'direct_comment_submit'
    commentSubmit.setAttribute("type", "submit")
    commentSubmit.value = "Tweet";

    commentForm.append(commentInput, backBtn, commentSubmit )

    return commentForm
}


export default {
    createDirectForm
}