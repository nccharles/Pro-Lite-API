// Cloudinary Upload Image script
const CLOUDINARY_URL='https://api.cloudinary.com/v1_1/nccharles/image/upload'
const CLAUDINARY_UPLOAD_PRESET="yvf1btz9"

const imgPreview= document.getElementById('img-preview');
const fileUpload = document.getElementById('file-upload');

fileUpload.addEventListener('change', (event)=>{
    let file=event.target.files[0];
    let formData=new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLAUDINARY_UPLOAD_PRESET);
    axios({
        url: CLOUDINARY_URL,
        method:"POST",
        headers:{
            'Content-Type':'application/x-www-form-urlencoded'
        },
        data:formData
    }).then(res=>{
        console.log(res)
        imgPreview.src=res.data.secure_url;
    }).catch(err=>{
        console.log(err)
    });
});