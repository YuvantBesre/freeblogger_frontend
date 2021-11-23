// AXIOS CONFIGURATION
import axios from 'axios';
import accessToken from '../helpers/access-token'
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.baseURL = 'https://dummy-api.handysolver.com/'

export default {
    methods : {
        // AXIOS GET REQUEST
        requestGET(url, params, headers, successResponse = null, errorResponse = null) {
            axios.get(
                url, {
                    params : params,
                    headers : headers
                }
            ).then(response => {
                if(successResponse)
                    successResponse(response);
            }).catch(error => {
                if(errorResponse)
                    errorResponse(error)
            })
        },
        
        // AXIOS POST REQUEST
        requestPOST(url, params, headers, successResponse = null, errorResponse = null) {
            axios.post(
                url, params, { headers : headers }
            ).then(response => {
                if(successResponse)
                    successResponse(response);
            }).catch(error => {
                if(errorResponse)
                    errorResponse(error)
            })
        },
        
        // AXIOS PUT REQUEST
        requestPUT(url, params, headers, successResponse = null, errorResponse = null) {
            axios.put(
                url, params, { headers : headers }
            ).then(response => {
                if(successResponse)
                    successResponse(response);
            }).catch(error => {
                if(errorResponse)
                    errorResponse(error)
            })
        },

        // AXIOS PATCH REQUEST
        requestPATCH(url, params, headers, successResponse = null, errorResponse = null) {
            axios.patch(
                url, params, { headers : headers }
            ).then(response => {
                if(successResponse)
                    successResponse(response);
            }).catch(error => {
                if(errorResponse)
                    errorResponse(error)
            })
        },

        // AXIOS DELETE REQUEST
        requestDELETE(url, params, headers, successResponse = null, errorResponse = null) {
            axios.delete(
                url, { headers : headers }, 
            ).then(response => {
                if(successResponse)
                    successResponse(response);
            }).catch(error => {
                if(errorResponse)
                    errorResponse(error)
            })
        }
    }
}