export default {
    required : (value) => {
        if(value === '' || value === null || value === undefined)
            return 'This field is required!';
        else
            return !!value
    },

    validEmail : (value) => {
        if(value) {
            if(value.indexOf('@') > -1 && value.indexOf('.') > -1)
                return !!value
            return 'Please enter a valid email address!'
        }
        return !!value
    },

    validPassword : (value) => {
        if(value) {
            if(value.length >= 6)
                return !!value;
            return 'Password must be at least 6 letters.'
        }
        return !!value
    },

    validContent : (value, letters) => {
        if(value) {
            if(value.length >= letters)
                return !!value;
            return `The content must have at least ${letters} letters`
        }
        return !!value
    }
}