import {fail} from '@sveltejs/kit'

export const actions = {
    upload: async ({request}) => {
        const data = await request.formData();
        const file = data.get('file') as File;

        const fileTypes = [".pdf"];
        let inludesFileType = false;
        for(let i=0;i<fileTypes.length;i++) {
            if(file.name.endsWith(fileTypes[i])) {
                inludesFileType = true;
                break;
            }
        }
        if(!inludesFileType) return fail(500, {error: true, message: "Unsupported file type"});

        if(file) {
          const buffer = await file.arrayBuffer();

          const response = await fetch('https://printabledigipost.azurewebsites.net/api/DigipostPrintable?filename='+file.name, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/octet-stream'
            },
            body: buffer
          });

          const responseData = await response.json();
          console.log(responseData);

          return {success: true, data: responseData};
        }
        return fail(500, {error: true, message: "Something went wrong handing the file."});
    }
}