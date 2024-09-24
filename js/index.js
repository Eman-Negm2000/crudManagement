 

var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCatInput = document.getElementById("productCat");
var productDescInput = document.getElementById("productDesc");
var searchInput = document.getElementById("search");
var mainBtnInput=document.getElementById('mainBtn');
var productContainer ;
var currentIndex=0;

if (localStorage.getItem('myProduct' ) !=null )  {

    productContainer= JSON.parse( localStorage.getItem('myProduct') );
    displayProduct();

}
else{
    productContainer=[];
}



function add(){
if(mainBtnInput.innerHTML=="addProduct"){
   addProduct();
}
else{
    editData();
}

}

function addProduct () {

    var product = {
     name:productNameInput.value ,
     price:productPriceInput.value ,
     cat:productCatInput.value ,
     desc:productDescInput.value 

    }
    
    productContainer.push(product);
    localStorage.setItem ( 'myProduct', JSON.stringify(productContainer) ) ;
    console.log(productContainer);
    clearForm();
    displayProduct();
}



function displayProduct() {

 var cartoona ='';
 
 for ( var i =0 ; i<productContainer.length ; i++ )  {
     
    cartoona += `<tr>
    <td>${i}</td>
    <td>${productContainer[i].name}</td>
    <td>${productContainer[i].price}</td>
    <td>${productContainer[i].cat}</td>
    <td>${productContainer[i].desc}</td>
    <td><button class="btn btn-outline-warning" onclick="setForm(${i});">update</button></td>
    <td><button onclick="deleteProduct(${i});" class="btn btn-outline-danger">delete</button></td>
   </tr> `
 }
 document.getElementById('tableRow').innerHTML=cartoona;
    
}


function clearForm() {
    productNameInput.value="";
    productPriceInput.value ="";
    productCatInput.value ="";
    productDescInput.value ="";
}

function deleteProduct(productIndex) {
    productContainer.splice(productIndex,1)
    localStorage.setItem ( 'myProduct', JSON.stringify(productContainer) ) ;
    displayProduct();
}

function search(trim) {
    var cartona='';
    for(var i=0;i<productContainer.length;i++){
      if(productContainer[i].name.toLowerCase().includes(trim.toLowerCase()) == true){
        cartona += `<tr>
        <td>${i}</td>
        <td>${productContainer[i].name}</td>
        <td>${productContainer[i].price}</td>
        <td>${productContainer[i].cat}</td>
        <td>${productContainer[i].desc}</td>
        <td><button class="btn btn-outline-warning" onclick="setForm(${i});">update</button></td>
        <td><button onclick="deleteProduct(${i});" class="btn btn-outline-danger">delete</button></td>
       </tr> `
      }
    }
    document.getElementById('tableRow').innerHTML=cartona;
 
}


function setForm(index){
    currentIndex=index;
    productNameInput.value =productContainer[index].name;
    productPriceInput.value=productContainer[index].price;
    productCatInput.value=productContainer[index].cat;
    productDescInput.value= productContainer[index].desc;
    mainBtnInput.innerHTML= "updateProduct";
}

function editData(){
    productContainer[currentIndex].name=productNameInput.value;
    productContainer[currentIndex].price=productPriceInput.value;
    productContainer[currentIndex].cat= productCatInput.value;
    productContainer[currentIndex].desc=productDescInput.value;
    mainBtnInput.innerHTML= "addProduct";
    localStorage.setItem ( 'myProduct', JSON.stringify(productContainer) ) ;
    displayProduct();
    clearForm();
}