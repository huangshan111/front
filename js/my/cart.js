define(["./interview","./shift"],function(interview,shift){
        return function (cc)
            {
                return interview.price*shift.count+cc

            }


})