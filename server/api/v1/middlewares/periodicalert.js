
const service =require("../services/service");

const MailTrigger = require('./mail')
class PeriodicAlert  {
    

    async sendAlertforReadinessEvery3hrs()
    {
        let MailContent = {
            ToMail: "narmadha.m@veetechnologies.com",
            CcMail:"",
            MailSubject:"Request to fill Readiness checklist",
            MailBody:"Hi Facility Manager, Please fill readiness checklist.."}

        await MailTrigger.SendMail(MailContent);
    }
}

export default new PeriodicAlert();
