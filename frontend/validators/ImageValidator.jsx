export default function ImageValidator(e) {
if(e.target.files && e.target.files.length===1)
{
let pic=e.target.files[0]
console.log(pic)
if(!["image/jpeg","image/png","image/gif","image/jpg","image/webp"].includes(pic.type))
    return "file type can be only jpg,jpeg,png,gif,webp"
else if(pic.size>1048576)
    return "Pic Size cannot be more than 1MB ,Upload less than 1 MB"
else
    return ""
}
else{
    
}
}
