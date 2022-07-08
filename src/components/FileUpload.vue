<template>

    <h2>OTA</h2>

    <div class="container">

        <form @submit.prevent="HandleFile" id="fileUploadForm">
            <div class="form-group">
                <label for="binFileField">OTA tiedosto</label>
                <input type="file" class="form-control" id="binFileField" accept=".bin">
            </div>

            <div class="form-group">
                <label for="versionTextField">Versio tiedosto</label>
                <input type="file" class="form-control" id="versionTextField" accept=".txt">
            </div>
            
            <div id="submitLogin" class="form-group container">
                <input type="submit" value="Lähetä" class="btn btn-primary">

                <p v-if="status" class="container">Status: {{status}}</p>
            </div>
        </form>
    </div>

    

    <div class="container">

        <h2>Tämänhetkinen OTA:</h2>

        <div class="container" v-if="!fileStatusError">
            <p>Versio nro:
                <span>{{versioNro}}</span>
            </p>

            <p>Binääri tiedosto:</p>
        
            <p>{{uploadedFiles}}</p>
        </div>

        <div class="container" v-if="fileStatusError">
            <p>Tiedostoja ei löytynyt</p>
        </div>
    </div>
</template>

<script>
import axios from "../axios";

export default {
    
    name: 'FileUploadComponent',
    components: {
    },
    data () {
        return {
            status: null,
            uploadedFiles: null,
            fileStatusError: null,
            versioNro: null,
        }
    },
    methods: {

        HandleFile(file) {

            this.UploadFile(file.target[0].files[0]);
            this.UploadFile(file.target[1].files[0]);
        },
        UploadFile(file) {

            let formData = new FormData();
            formData.append("file", file);

            axios.post('/ota/upload', formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).then(response => {

                this.status = response.statusText;

            }).catch(error => {
                this.status = error;
            })
        },
        CheckUploadedFiles(){
            axios.get('/ota/version').then(response => {

                if(response.data.status === "error"){
                    this.fileStatusError = response.data.message;
                    return;
                }

                this.uploadedFiles = response.data.link;
                this.versioNro = response.data.version;

            }).catch(error => {
                console.log(error);
            })
        }
    },
    mounted () {
        this.CheckUploadedFiles();
    }
}

</script>
