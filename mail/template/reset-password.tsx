import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";

interface PasswordResetEmailProps {
  userEmail: string;
  resetLink: string;
  companyName: string;
}

const PasswordResetEmail = (props: PasswordResetEmailProps) => {
  const { userEmail, resetLink, companyName } = props;

  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Preview>Reset your password - Action required</Preview>
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] p-[32px] max-w-[600px] mx-auto">
            {/* Header */}
            <Section className="text-center mb-[32px]">
              <Heading className="text-[24px] font-bold text-gray-900 m-0 mb-[8px]">
                Password Reset Request
              </Heading>
              <Text className="text-[16px] text-gray-600 m-0">
                We received a request to reset your password
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="mb-[32px]">
              <Text className="text-[16px] text-gray-700 mb-[16px] m-0">
                Hello,
              </Text>
              <Text className="text-[16px] text-gray-700 mb-[16px] m-0">
                We received a request to reset the password for your account
                associated with <strong>{userEmail}</strong>.
              </Text>
              <Text className="text-[16px] text-gray-700 mb-[24px] m-0">
                Click the button below to create a new password. This link will
                expire in 24 hours for security reasons.
              </Text>

              {/* Reset Button */}
              <Section className="text-center mb-[24px]">
                <Button
                  href={resetLink}
                  className="bg-blue-600 text-white px-[32px] py-[12px] rounded-[8px] text-[16px] font-semibold no-underline box-border inline-block"
                >
                  Reset Your Password
                </Button>
              </Section>

              <Text className="text-[14px] text-gray-600 mb-[16px] m-0">
                If the button above doesn't work, copy and paste this link into
                your browser:
              </Text>
              <Text className="text-[14px] text-blue-600 mb-[24px] m-0 break-all">
                {resetLink}
              </Text>
            </Section>

            {/* Security Notice */}
            <Section className="border-t border-gray-200 pt-[24px] mb-[32px]">
              <Heading className="text-[18px] font-semibold text-gray-900 mb-[12px] m-0">
                Security Notice
              </Heading>
              <Text className="text-[14px] text-gray-600 mb-[8px] m-0">
                • If you didn't request this password reset, please ignore this
                email
              </Text>
              <Text className="text-[14px] text-gray-600 mb-[8px] m-0">
                • This link will expire in 24 hours
              </Text>
              <Text className="text-[14px] text-gray-600 mb-[8px] m-0">
                • For security, this link can only be used once
              </Text>
              <Text className="text-[14px] text-gray-600 m-0">
                • Never share this link with anyone
              </Text>
            </Section>

            {/* Support */}
            <Section className="text-center mb-[24px]">
              <Text className="text-[14px] text-gray-600 m-0">
                Need help? Contact our support team at{" "}
                <Link
                  href="mailto:support@company.com"
                  className="text-blue-600 no-underline"
                >
                  support@company.com
                </Link>
              </Text>
            </Section>

            {/* Footer */}
            <Section className="border-t border-gray-200 pt-[24px] text-center">
              <Text className="text-[12px] text-gray-500 mb-[8px] m-0">
                © {new Date().getFullYear()} {companyName}. All rights
                reserved.
              </Text>
              <Text className="text-[12px] text-gray-500 m-0">
                123 Business Street, Suite 100, City, State 12345
              </Text>
              <Text className="text-[12px] text-gray-500 mt-[8px] m-0">
                <Link href="#" className="text-gray-500 no-underline">
                  Unsubscribe
                </Link>
                {" | "}
                <Link href="#" className="text-gray-500 no-underline">
                  Privacy Policy
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default PasswordResetEmail;
