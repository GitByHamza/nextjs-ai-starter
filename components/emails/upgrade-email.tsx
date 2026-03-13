import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Preview,
    Section,
    Text,
    Tailwind,
} from '@react-email/components';
import * as React from 'react';

interface UpgradeEmailProps {
    planType: string;
}

export const UpgradeEmail = ({ planType = 'Pro' }: UpgradeEmailProps) => {
    return (
        <Html>
            <Head />
            <Preview>Welcome to the {planType} Plan!</Preview>
            <Tailwind>
                <Body className="bg-white my-auto mx-auto font-sans px-2">
                    <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
                        <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                            <strong>Subscription Upgraded 🎉</strong>
                        </Heading>
                        <Text className="text-black text-[14px] leading-[24px]">
                            Hello there,
                        </Text>
                        <Text className="text-black text-[14px] leading-[24px]">
                            Thank you for upgrading to the <strong>{planType.toUpperCase()}</strong> plan.
                            Your account has been instantly credited, and you now have access to premium features.
                        </Text>
                        <Section className="text-center mt-[32px] mb-[32px]">
                            <Button
                                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                                href="https://yourdomain.com/dashboard"
                            >
                                Go to Dashboard
                            </Button>
                        </Section>
                        <Text className="text-black text-[14px] leading-[24px]">
                            If you have any questions, simply reply to this email. We are here to help!
                        </Text>
                        <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
                        <Text className="text-[#666666] text-[12px] leading-[24px]">
                            Your SaaS Company • 123 Tech Street • Global
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default UpgradeEmail;
