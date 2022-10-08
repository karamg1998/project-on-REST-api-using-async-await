var save=document.querySelector('.save');

save.addEventListener('click',Run);

function Run(e)
{
    e.preventDefault();
    var expense=document.getElementById('expenseamount').value;
    var description=document.getElementById('description').value;
    var category=document.getElementById('category').value;
    
    var myobj={
        Expense:expense,
        Description:description,
        Category:category
        } 

        async function post()
        {
          try{
            await axios.post("https://crudcrud.com/api/c09cfc35dc16454faf08e35b7a8bbbb7/expenses",myobj);
            showOutput(myobj);
          }
          catch(err){
            document.body.innerHTML=document.body.innerHTML+"<h4>something went wrong with post</h4>";
            console.error(err);
            }
           
        }
        post();
  
  
}


 window.addEventListener('DOMContentLoaded', (event) => {
   
    async function get()
    {
      try{
        let res=await axios.get("https://crudcrud.com/api/c09cfc35dc16454faf08e35b7a8bbbb7/expenses");
      for(var i=0;i<res.data.length;i++)
      {
        showOutput(res.data[i]);
      }
      }
      catch(err){
        document.body.innerHTML=document.body.innerHTML+"<h4>something went wrong with dom content loaded</h4>";
        console.error(err);
        }
     }
      get();
  

}); 

function showOutput(user)
{
           var m=document.querySelector('.data');
    
            var n_element=document.createElement('li');
            n_element.id=user._id;
            
            var d1=document.createTextNode(`Expense:${user.Expense} `);
            n_element.appendChild(d1);
        
            var d2=document.createTextNode(`Description:${user.Description} `);
            n_element.appendChild(d2);
        
            var d3=document.createTextNode(`Category:${user.Category} `);
            n_element.appendChild(d3);
        
            var button=document.createElement('button');
            button.className='delete';
            button.textContent='Delete';
            n_element.appendChild(button);

            var e_button=document.createElement('button');
            e_button.className='edit';
            e_button.textContent='Edit';
            n_element.appendChild(e_button);
            
            m.appendChild(n_element);
}

var del=document.querySelector('.data');
del.addEventListener('click',remove);
del.addEventListener('click',edit);

 function remove(e)
{
    
      if(e.target.classList.contains('delete'))
      {
         var li=e.target.parentElement;
         del.removeChild(li);
         
         async function d()
         {
          try{
             var res=await axios.delete(`https://crudcrud.com/api/c09cfc35dc16454faf08e35b7a8bbbb7/expenses/${li.id}`)
            console.log(res);
          }
             catch(err){
              document.body.innerHTML=document.body.innerHTML+"<h4>something went wrong delete functionality</h4>";
              console.error(err);
              }
         }
         d();
       
      }
        
}



 function edit(e)
{
    
      if(e.target.classList.contains('edit'))
      {
        var li=e.target.parentElement;
        del.removeChild(li);
       
        async function ed()
        {
          try{
             let ed=await axios.get(`https://crudcrud.com/api/c09cfc35dc16454faf08e35b7a8bbbb7/expenses/${li.id}`)
             await retriveUser(ed.data);
             let res= await axios.delete(`https://crudcrud.com/api/c09cfc35dc16454faf08e35b7a8bbbb7/expenses/${li.id}`)
             console.log(res)
          }
         catch(err){
            document.body.innerHTML=document.body.innerHTML+"<h4>something went wrong with edit functionality</h4>";
            console.error(err);
            }
        }
        ed();
        
       
      }
      
      function retriveUser(data)
      {
        var e=document.getElementById('expenseamount');
        e.value=data.Expense;
        var d=document.getElementById('description');
        d.value=data.Description;
        var c=document.getElementById('category');
        c.value=data.Category;
      }
        
}

