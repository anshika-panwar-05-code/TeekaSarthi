package com.teekasarthi.teekasarthi.service;
import com.teekasarthi.teekasarthi.entity.Beneficiary;
import com.teekasarthi.teekasarthi.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    @Autowired
    private JavaMailSender mailSender;

    public String sendAddBeneficiaryNotification(Beneficiary beneficiary) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("teekasarthi@gmail.com");
        message.setTo(beneficiary.getEmail());
        message.setSubject("\uD83C\uDD95 New Beneficiary Registered - Teeka Sarthi");
        message.setText("Hello,\n\n"
                + "A new beneficiary has been successfully registered on the Teeka Sarthi platform.\n\n"
                + "📋 Name       : " + beneficiary.getName() + "\n"
                + "📞 Phone No.  : " + beneficiary.getPhoneNo() + "\n"
                + "🆔 Member Type: " + beneficiary.getMembertype() + "\n"
                + "🏙️ City       : " + beneficiary.getCity() + "\n"
                + "🏥 Center     : " + beneficiary.getCenterName() + "\n\n"
                + "Please log in to the dashboard for more details.\n\n"
                + "Regards,\n"
                + "Teeka Sarthi System");

        mailSender.send(message);
        System.out.println("Email sent to " + beneficiary.getEmail());
        return ("Email Sent Successfully to " + beneficiary.getEmail());
    }
}
