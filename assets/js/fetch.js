const fetchApi = {

    URI :'http://localhost:3000/',

    post: async (dataSetting,endPoint)=>{

        try {
            const setting = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataSetting)
            }
    
    
            const response = await fetch(fetchApi.URI+ endPoint, setting);
            const data = await response.json();
            return data;
    
            
        } catch (error) {
            console.log(error)
        }
    }
}