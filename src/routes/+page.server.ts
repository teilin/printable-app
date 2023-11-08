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
          console.log("File set");
          const buffer = await file.arrayBuffer();
          const stream = await file.stream();

          const response = await fetch('https://printabledigipost.azurewebsites.net/api/DigipostPrintable', {
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
//{"okForPrint":false,"okForWeb":true,"pages":1,"errors":["The left m
        return fail(500, {error: true, message: "Something went wrong handing the file."});
    }
}