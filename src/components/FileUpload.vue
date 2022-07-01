<template>

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
</template>

<script>
import axios from "../axios";

export default {
    
    name: 'FileUploadComponent',
    components: {
    },
    data () {
        return {
            status: null
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
        }
    }
}

</script>
