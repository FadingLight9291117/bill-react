import {
    Button,
    Card,
    Checkbox,
    Input,
    Row,
    Spacer,
    Text,
} from "@nextui-org/react";
import { Mail } from "../assets/icon/Mail";
import { Password } from "../assets/icon/Password";
import { React } from "../assets/icon/React";
import { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <Card css={{ p: "$6", mw: "400px" }}>
            <Card.Header>
                <React fill="currentColor" />
                <Text size={18}>
                    Welcome to CLZ's
                    <Text b size={18}>
                        {" "}
                        BillAPP
                    </Text>
                </Text>
            </Card.Header>
            <Card.Divider />
            <Card.Body>
                <Input
                    clearable
                    bordered
                    fullWidth
                    color="primary"
                    size="lg"
                    placeholder="Email"
                    contentLeft={<Mail fill="currentColor" />}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <Spacer />
                <Input.Password
                    clearable
                    bordered
                    fullWidth
                    color="primary"
                    size="lg"
                    placeholder="Password"
                    contentLeft={<Password fill="currentColor" />}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Spacer />
                <Row justify="space-between">
                    <Checkbox>
                        <Text size={14}>Remember me</Text>
                    </Checkbox>
                    <Text size={14}>Forgot password?</Text>
                </Row>
            </Card.Body>
            <Card.Footer>
                <Row justify="center">
                    <Button size="sm" light>
                        Clear
                    </Button>
                    <Button size="sm">Sign in</Button>
                </Row>
            </Card.Footer>
        </Card>
    );
};

export default Login;
