const CheckURLuponLoad = async ()=>{
    const current_url_params = window.location.search
    if (current_url_params){
        const url = new URL("http://localhost:3000/search/api/v1/")
        try {
            // Fetch response form backend
            const respone = await fetch(`${url}${current_url_params}`)
            
            // Check if response if OK 
            if (!respone.ok){
                throw new console.error('Network response not OK');
            }
            
            // convert response to Json called data
            const data = await respone.json()
            
            // Update HTML with data
            UpdateHtml(data)            
            // Log the key-value pairs to the console
            console.log(current_url_params.toString())
        } catch (error) {
            console.log(error)
        }  
    }
}

CheckURLuponLoad();


document.addEventListener('DOMContentLoaded', (event) =>{
    const form = document.getElementById('myForm');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the default form submission

        // Create a new FormData object from the form element
        let formData = new FormData(form);
        
        //append Form data into a search parameters format 
        const Params = new URLSearchParams();
        formData.forEach((value, key) => {
            Params.append(key,value)
        });
       
        // Update URL search params according to form data
        UpdateURL_name(Params)

        // Create URL object 
        const url = new URL('http://localhost:3000/search/api/v1/') 
        try {
            // Fetch response form backend
            const respone = await fetch(`${url}?${Params.toString()}`)
            
            // Check if response if OK 
            if (!respone.ok){
                throw new console.error('Network response not OK');
            }
            
            // convert response to Json called data
            const data = await respone.json()
            
            // Update HTML with data
            UpdateHtml(data)            
            // Log the key-value pairs to the console
            console.log(formData)
            console.log(Params.toString())
        } catch (error) {
            console.log(error)
        }        

    });
});



const UpdateHtml = (data)=>{
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; 
    data.product.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.textContent = `Name: ${item.name}, Price: ${item.price}, Featured: ${item.featured}, Rating: ${item.rating} `;
        resultsDiv.appendChild(itemDiv);
    })
}

const UpdateURL_name = (Params) => {
    const newURL = `${window.location.pathname}?${Params.toString()}`
    history.replaceState({},'',newURL)
}