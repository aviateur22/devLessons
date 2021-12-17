const app = {  

    thematicElement : document.getElementById('thematic_id'),

    subCategoryElement : document.getElementById('subcatgory_id'),

    /** 
     * Recuperation des sous catégories de cours
    */
    subcategoryLoading:async(e)=>{
        
        try {
            //reset du selecteur subcatégory
            app.subCategoryElement.innerHTML='';            

            //thematic id
            const thematic =  e.target.value;
            const dataSetting = {'category' : thematic};

            //End point api
            const subcategoryEndPoint = 'getSubcategory';

            //fetch post subcategory
            const data = await fetchApi.post(dataSetting, subcategoryEndPoint);
           
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

            console.log(error);            
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


