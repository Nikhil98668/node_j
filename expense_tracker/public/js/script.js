const publicIp='http://localhost:3000';
//const publicIp='http://3.109.143.245:4000';


let addexpenseinput = document.getElementById("addexpenseinput");
let addexpensedescription = document.getElementById("addexpensedescription");
let addexpensecategory = document.getElementById("addexpensecategory");
let addexpensebtn = document.getElementById("addexpensebtn");
let updateexpensebtn = document.getElementById("updateexpensebtn");


window.addEventListener("DOMContentLoaded",async ()=>{
  try{
      const token = localStorage.getItem('token')
      const tokenDecoded = parseJwt(token);
      const premiumMember = tokenDecoded.ispremiumuser;
      let expenseList=null;
      if (!token.trim() || token===undefined) {
        return window.location.href = "../view/login.html";
      }
      if(premiumMember){
        premiumUserMsg();
        showLeaderBoard();
        showDownloadsHistory();
      }
    document.getElementById("loggedName").innerHTML= `Welcome<span class=" font-extrabold text-[#002D74]"> ${tokenDecoded.name}</span>`;
    const res = await axios.get(`${publicIp}/admin/getAllExpenses`,{headers:{"Authorization":token}});
    expenseList =res.data.allExpenses;
    
    let pageLimit = parseInt(localStorage.getItem("pageLimit")) || 5;
    let currentPage = 1;
    let prevPageButton = document.getElementById("prevPage");
    let nextPageButton = document.getElementById("nextPage");
    let pageNumberContainer = document.getElementById("pageNumber");
    let pageLimitInput = document.getElementById("pageLimit");
    let savePageLimitButton = document.getElementById("savePageLimit");
    
    pageLimitInput.value = pageLimit;

    function displayExpenses() {
      document.getElementById("addedexpenselist").innerHTML = "";
      let startIndex = (currentPage - 1) * pageLimit;
      let endIndex = startIndex + pageLimit;
      let expensesToDisplay = expenseList.slice(startIndex, endIndex);
        expensesToDisplay.forEach(expenseItem=>{
          showexpenses(expenseItem);
        })      
      pageNumberContainer.innerHTML = currentPage;
      prevPageButton.disabled = currentPage === 1;
      document.getElementById("showingcurrPage").innerHTML = currentPage;
      document.getElementById("showingRange").innerHTML= Math.ceil(expenseList.length / pageLimit);
      if(prevPageButton.disabled) prevPageButton.classList.add("bg-red-200")
      else prevPageButton.classList.remove("bg-red-200")
      nextPageButton.disabled = currentPage === Math.ceil(expenseList.length / pageLimit);
      if(nextPageButton.disabled) nextPageButton.classList.add("bg-red-200")
      else nextPageButton.classList.remove("bg-red-200,bg-green-300")
    }  
  prevPageButton.addEventListener("click", function() {
      currentPage--;
      displayExpenses();
  });  
  nextPageButton.addEventListener("click", function() {
      currentPage++;
      displayExpenses();
  });  
  savePageLimitButton.addEventListener("click", function() {
    let newPageLimit = parseInt(pageLimitInput.value);
    if (newPageLimit > 0 && newPageLimit<= expenseList.length) {
        pageLimit = newPageLimit;
        localStorage.setItem("pageLimit", pageLimit);
        currentPage = 1;
        displayExpenses();
    }
    else{
      alert(`Expense range allowed is minimum: 1 and maximum: ${expenseList.length}`)
      return ;
    }
});
  displayExpenses();         
  }
  catch(err) {
    document.querySelector('.error-textMsg').innerText=`Server error- ${err} ,in fetching data. Please Refresh the Page.`;
    document.querySelector('#error-alert').classList.toggle("hidden")
    }
})




// showexpenses
async function showexpenses(expenseItem) {
  try{
  document.getElementById("addexpenseinput").value = "";
  document.getElementById("addexpensedescription").value = "";
  document.getElementById("addexpensecategory").value = "";
  document.getElementById('expenseRadio').checked = false;
  document.getElementById('incomeRadio').checked = false;
  
    const d = new Date(`${expenseItem.updatedAt}`);
    let expen='';
    let incom='';
    if(expenseItem.amountType==='expense'){
      expen=expenseItem.amount
      incom=0
    }
    else if(expenseItem.amountType==='income'){
      incom=expenseItem.amount
      expen=0
    }
    const addedexpenselist = document.getElementById("addedexpenselist");
    const html = `
      <tr id="${expenseItem.id}" class="text-gray-600 text-sm hover:bg-gray-100">
      <td class="py-2 px-1 border-b border-gray-500"><span class="font-bold">&#x20b9; </span> ${incom}</td>
      <td class="py-2 px-1 border-b border-gray-400"><span class="font-bold">&#x20b9; </span> ${expen}</td>
      <td class="py-2 px-1 border-b border-gray-400">${expenseItem.description}</td>
      <td class="py-2 px-1 border-b border-gray-400">${expenseItem.category}</td>
      <td class="py-2 px-1 border-b border-gray-400">${d.toDateString()}</td>
     <td class="py-2  border-b border-gray-400">
      <button onclick="editexpense('${expenseItem.id}','${expenseItem.amount}','${expenseItem.description}','${expenseItem.category}','${expenseItem.amountType}')" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded "><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
      <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
      <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
    </svg>
    </button>
    
    <button onclick="deleteexpense('${expenseItem.id}')" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 mt-1  rounded  "><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
      <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
    </svg>
    </button>
    
    </td>
   
    </tr>`;
  addedexpenselist.innerHTML += html;
}
catch(err){
  document.querySelector('.error-textMsg').innerText=`Server error- ${err} ,in getting expenses data on screen. Please Refresh the Page.`;
  document.querySelector('#error-alert').classList.toggle("hidden")
   }
}




async function saveToDb(event) {
  event.preventDefault();
  let amountType = document.querySelector('input[name="amountType"]:checked').value;
  let amount = event.target.addexpenseinput.value;
  let description = event.target.addexpensedescription.value;
  let category = event.target.addexpensecategory.value;
  const obj = { amount, description, category , amountType };
  try{
    const token = localStorage.getItem('token')
    const res = await axios.post(`${publicIp}/admin/addNewExpense`, obj,{headers:{"Authorization":token}});
    showexpenses(res.data.newAddedExpense);
      document.getElementById("success-alert").innerText = "Expense added Successfully!"
      awakeSuccessAlert();
    }
  catch(err){
      console.log(err);
      document.querySelector('.error-textMsg').innerText=`Server error- ${err} ,in inserting data to Db. Please Retry.`;
      document.querySelector('#error-alert').classList.toggle("hidden")
    };
}





// editexpense
function editexpense(expId, expAmount, expDesc, expCat , expType) {
  addexpenseinput.value = expAmount;
  addexpensedescription.value = expDesc;
  addexpensecategory.value = expCat;
  if (expType === 'income') {
    document.getElementById('incomeRadio').checked = true;
  } else {
    document.getElementById('expenseRadio').checked = true;
  }
  removeExpenseFromScreen(expId);
  document.querySelector("#addexpensebtn").style.display = "none";
  document.querySelector("#updateexpensebtn").style.display = "block";
  updateexpensebtn.setAttribute("onclick", `updateUser('${expId}')`);
}



//update in Db
async function updateUser(expId) { 
  let amount = addexpenseinput.value;
  let description = addexpensedescription.value;
  let category = addexpensecategory.value;
  let amountType = document.querySelector('input[name="amountType"]:checked').value;
  const obj = { amount, description, category,amountType };
  const token = localStorage.getItem('token')
  try{    
    const res1 = await axios.put(`${publicIp}/admin/updateExpense/${expId}`,obj,{headers:{"Authorization":token}});
      if(res1){
      awakeSuccessAlert();      
      amount = "";
      description = "";
      category = "";
      document.querySelector("#addexpensebtn").style.display = "block";
      document.querySelector("#updateexpensebtn").style.display = "none";
      updateexpensebtn.removeAttribute("onclick");
      document.getElementById("success-alert").innerText="Expense Updation Successful.";
      }
      else{
        window.location.reload();
      }
    }
    catch(err){
      console.log(err);
      document.querySelector('.error-textMsg').innerText=`Server error- ${err} ,in updating data. Please Refresh the Page.`;
      document.querySelector('#error-alert').classList.toggle("hidden")
    }
  try{
    const token = localStorage.getItem('token')
    const result2 = await axios.get(`${publicIp}/admin/getExpenseById/${expId}`,{headers:{"Authorization":token}})
    if(result2){    
        showexpenses(result2.data.updatedUserExpense);
        return ;
    }
    else{
     window.location.reload();
    }
    }
    catch(err){
          console.log(err);
          window.location.reload();
        }
  }



//remove from screen
async function removeExpenseFromScreen(expId) {
  try {
    const remExpense = document.getElementById(expId);
    remExpense.parentNode.removeChild(remExpense);
  } catch (err) {
    console.log(err);
    document.querySelector('.error-textMsg').innerText=`Server error- ${err} ,in removing data from screen. Please Refresh the Page.`;
    document.querySelector('#error-alert').classList.toggle("hidden")
  }
}



// deleteexpense from db
async function deleteexpense(expId) {
  try{
    const token = localStorage.getItem('token')
    await axios.delete(`${publicIp}/admin/deleteExpense/${expId}`,{headers:{"Authorization":token}})
    removeExpenseFromScreen(expId);    
    document.getElementById("deletion-alert").innerText="Expense deleted Successfully!";
    awakeDeletedAlert();
    }
  catch(err){
      console.log('error form delete request',err)
      document.querySelector('.error-textMsg').innerText=`Server error- ${err} ,in deleting.Please Refresh the Page.`;
      document.querySelector('#error-alert').classList.toggle("hidden")
    }
}



//====buy premium=====
document.getElementById("buyPremiumBtn").addEventListener("click", async function (e) {
  try {
    const token = localStorage.getItem('token');
    const response =await  axios.get(`${publicIp}/purchase/premiumMember`, { headers: { "Authorization": token } });

    // Create the payment handler function
    var paymentcreds ={ 
      "key": response.data.key_id,
            "order_id": response.data.order.id,
            "handler": async function (response){
      try {
        // Make a POST request to update the transaction status
        const res = await axios.post(`${publicIp}/purchase/updateTransactionStatus`, {
          order_id: paymentcreds.order_id,
          payment_id: response.razorpay_payment_id,
        }, { headers: {"Authorization": token } });
        
        premiumUserMsg();
        alert('Your Premium Membership is now active'); 
        localStorage.setItem('token',res.data.token)
        showLeaderBoard();  
        showDownloadsHistory();
      }
      catch (err) {
        console.error(err);
        throw new Error(err);
      }
    }
    };  

    // Create the Razorpay instance and open the payment modal
    const rzpl = new Razorpay(paymentcreds);
    rzpl.open();
    e.preventDefault();
    rzpl.on('payment.failed', async (response) => {
      try{
        alert(`Alert: ${response.error.description}`)
        } catch (error) {
            console.log(error)
            alert(`Payment failed due to ${error.error.description}`);
        }
    });
  } catch (err) {
    console.log(err);
    alert('Something went wrong last line. Please try again.');
    throw new Error(err);
  }
});




//downloadreport mtd
async function downloadReport(){
  try{
    const token =localStorage.getItem('token')
    const response = await axios.get(`${publicIp}/premium/downloadExpensesReport`,{headers: {"Authorization":token}});
    if(response.status === 200){
              const link = document.createElement("a");
              link.href = response.data.fileUrl;
              link.download = 'ExpenseReport.json';
              link.click();
    }
    else{
      console.log("issue in fetching report.");
      throw new Error(`Facing some issue. Try after Sometime.. ${response.data.message}`)
    }
    }
    catch(err){
      console.log("error in fetching report from server. ",err)
      document.querySelector('.error-textMsg').innerText=`Server error- ${err.message} ,in Downloading report. Please Retry after sometime.`;
      document.querySelector('#error-alert').classList.toggle("hidden")
    }
  }


//logout
document.getElementById('logoutBtn').addEventListener('click',function(){
  localStorage.removeItem('token')
  return window.location.href='../view/login.html'
})


// err-alert close button:
document.getElementById("close-button").addEventListener("click", function() {
  document.getElementById("error-alert").remove();
  window.location.reload();
});


//alert awake and sleep
function awakeSuccessAlert(){
  document.getElementById("success-alert").classList.toggle("hidden");
  setTimeout(function() {
    document.getElementById("success-alert").classList.toggle("hidden");
  }, 1500);
}


//deleted alert
function awakeDeletedAlert(){
  document.getElementById("deletion-alert").classList.toggle("hidden");
      setTimeout(function() {
        document.getElementById("deletion-alert").classList.toggle("hidden");
      }, 1500);
}
