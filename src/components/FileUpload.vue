<template>

    <div class="container">
        <h2>OTA</h2>
        <br/>
    </div>
    <Card>
    <div class="container">

        <form @submit.prevent="HandleFile" id="fileUploadForm">
            <div class="form-group">
                <label for="binFileField">OTA tiedosto</label>
                <input type="file" class="form-control" id="binFileField" accept=".bin">
            </div>

            <br/>

            <div class="form-group">
                <label for="versionTextField">Versio tiedosto</label>
                <input type="file" class="form-control" id="versionTextField" accept=".txt">
            </div>
            
            <div id="submitLogin" class="form-group container">
                
                <Button
                    label="Lähetä"
                    type="submit"
                    size="md"
                    icon-right="light-icon-upload"
                    rounded
                    class="submitButton"
                />

                <p v-if="status" class="container">Status: {{status}}</p>
            </div>
        </form>
    </div>

    <LoaderTemplate :isLoaded="loaded"/>

    <div class="container" v-if="loaded">

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
    </Card>
</template>

<script>
import axios from "../axios";
import LoaderTemplate from './LoaderTemplate.vue';
import Card from 'lightvue/card';
import Button from 'lightvue/button';

export default {
    
    name: 'FileUploadComponent',
    components: {
        LoaderTemplate,
        Card,
        Button
    },
    data () {
        return {
            status: null,
            uploadedFiles: null,
            fileStatusError: null,
            versioNro: null,
            loaded: false
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

                this.status = response.data.message;

            }).catch(error => {
                this.status = error.data;
            })
        },
        CheckUploadedFiles(){

            axios.get('/ota/version').then(response => {

                this.loaded = true;

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
<style scoped>
.submitButton {
    background-color: #3F72AF; /** normal bg color*/
    --theme-color: #112D4E; /** pressed bg color and hover text color*/
    --theme-color-dark: #3F72AF; /** hover bg color */
}
</style>