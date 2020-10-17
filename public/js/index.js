console.log("index.js running at godspeed.")
var uploadArea = document.getElementById("upload-area");
var uploadForm = document.getElementById("uploadForm");

var reader = new FileReader();
var http = new XMLHttpRequest();
var url = "/app/file-upload";


createImage = function(file){
    var imgComponent = document.createElement('img');
    imgComponent.setAttribute('src',file.url);
    return imgComponent
}

createImageArea = function(files){
    var imgAreaComponent = document.createElement('div');
    files.forEach((item)=>{
        if(item.type.search('image')!=-1){
           var imageComponent = createImage(item);
        }
        imgAreaComponent.insertAdjacentElement('beforeend',imageComponent);
    })
    return imgAreaComponent;
}

createPostContent = function(content){
    var postContentComponent = document.createElement('p');
    postContentComponent.innerText = content;
    return postContentComponent;
}

createPost = function(options){
    var postComponent = document.createElement('div');
    var postContent = createPostContent(options.postContent);
    var imageArea = createImageArea(options.files);
    postComponent.insertAdjacentElement('beforeend', postContent);
    postComponent.insertAdjacentElement('beforeend', imageArea);
    uploadArea.insertAdjacentElement('afterbegin',postComponent);
}

http.onreadystatechange = function(){
    if(http.readyState == 4 && http.status == 200) {
        responseBody = JSON.parse(http.responseText);
        console.log(responseBody);
        createPost(responseBody);
    }
}

uploadForm.onsubmit= function(e){
    console.log("form clicked");
    var formData = new FormData(uploadForm);
    http.open('POST',url);
    http.send(formData);
    e.preventDefault();
}