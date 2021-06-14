export default function validatejs(formValues, fieldValidation) {
	let objkey = Object.keys(formValues);
	let objvalue = Object.values(formValues);
	objkey = objkey[0];
	objvalue = objvalue[0]
	let emailreg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	switch(objkey){
		case 'email' :
			if(objvalue.length < 1){
				return fieldValidation.email.presence;
			}
			else if (emailreg.test(objvalue) === false) {
			    return fieldValidation.email.email
			}
			break;

		case 'password' : 
			if(objvalue.length < 1){
				return fieldValidation.password.presence;
			}
			else if (objvalue.length < fieldValidation.password.length.minimum) {
			    return fieldValidation.password.length
			}
			break;
		default : 
			console.log("default case of validatejs")
	}
}