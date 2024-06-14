function ControlRecapito(via,ncivico,città,provincia,cap,telefono,note){
    
        var stop = {"via": "false", "ncivico": "false","città":"false","provincia":"false","cap": "false","telefono":"false","note":"false"} ;

        function isVuoto(x){
            if ((x === "") || (x === "undefined")) {
                return true;
            }
            return false;
        }

        function verificaRegEx(x,myRegEx){
            if ( !(myRegEx.test(x)) ){
                return false;
            }
            return true;
        } 

        if (isVuoto(via)) {
            stop.via = "true";
        } 
        if (isVuoto(ncivico)) {
            stop.ncivico = "true";
        }
        var myRegEx = /^[0-9]{1,3}$/;
        if(!verificaRegEx(ncivico,myRegEx)) {stop.ncivico = "true";}
        if (isVuoto(città)) {
            stop.città = "true";
        }
        myRegEx = /^[a-zA-Z]{2}$/;
        if(!verificaRegEx(provincia,myRegEx)) {stop.provincia = "true";}
        if (isVuoto(provincia)) {
            stop.provincia = "true";
        }
        myRegEx = /^[0-9]{5}$/;
        if(!verificaRegEx(cap,myRegEx)) {stop.cap = "true";}
        if (isVuoto(cap)) {
            stop.cap = "true";
        }
        myRegEx = /^[0-9]{9,10}$/;
        if(!verificaRegEx(telefono,myRegEx)) {stop.telefono = "true";}
        if (isVuoto(telefono)) {
            stop.telefono = "true";
        }
        if (isVuoto(note)) {
            stop.note = "true";
        }
        return stop;
    
}

export default ControlRecapito;