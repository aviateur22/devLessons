
const app = {

    URI :'http://localhost:3000/',
    subcategoryEndPoint :'getSubcategory',

    thematicElement : document.getElementById('thematic_id'),

    subCategoryElement : document.getElementById('subcatgory'),

    

    /** */
    subcategoryLoading:async(e)=>{
        
        try {
            app.subCategoryElement.innerHTML='';
            const thematic =  e.target.value;            
              
            const setting = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({'category' : thematic})
            }


            const response = await fetch(app.URI+ app.subcategoryEndPoint, setting);
            const data = await response.json();

            if (data){

                data.forEach(element => {
                    const option = document.createElement('option');
                    option.value = element.id;
                    option.text = element.name.toUpperCase();
                    app.subCategoryElement.appendChild(option);
                    console.log(element.name);
                  
              });

            }


            
        } catch (error) {

            console.log(error)
            
        }
        
    },

    /** */
    init :()=>{
        app.thematicElement.addEventListener('change',(e)=>{
            app.subcategoryLoading(e);
        })
    }
};
document.addEventListener('DOMContentLoaded',app.init)


