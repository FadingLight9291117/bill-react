import styles from './index.module.scss'
import { NavLink, useLocation, useRoutes } from "react-router-dom";
import React, { ReactElement, useMemo, useState } from 'react';
import {
    Menu,
    MenuTheme,
    Layout as AntLayout
} from 'antd';
import {
    EditOutlined, FormOutlined,
    HomeOutlined,
    LoginOutlined,
    WechatOutlined
} from '@ant-design/icons';

interface IProps {
    children?: ReactElement
    home?: boolean
}

export default function Layout(props: IProps) {
    const { children, home } = props

    const items = [
        { label: <NavLink to={"/home"}>统计</NavLink>, key: '/home', icon: <HomeOutlined /> },
        { label: <NavLink to={"/record"}>记账</NavLink>, key: '/record', icon: <FormOutlined /> },
    ]


    const SiderMenu = (sprops: { theme?: MenuTheme }) => {

        const siderTitleCSS: React.CSSProperties = {
            color: "white",
            fontSize: "30px",
            paddingInline: "10px",
        }
        const [collapsed, setCollapsed] = useState(false)

        const location = useLocation()
        const selectedKey = useMemo(() => {
            return location.pathname === "/" ? "/home" : location.pathname
        }, [location.pathname])

        return (
            <AntLayout.Sider
                collapsible
                theme={sprops.theme}
                collapsed={collapsed}
                onCollapse={value => setCollapsed(value)}
            >
                {collapsed || <div style={siderTitleCSS}>{"FadingLight's Bill App"}</div>}
                <Menu
                    items={items}
                    theme={sprops.theme}
                    mode="inline"
                    defaultSelectedKeys={[selectedKey]}
                />
            </AntLayout.Sider>
        )
    }

    return (
        <div className={styles.container}>
            <nav className={styles.nav}>
                {home && <SiderMenu theme='dark' />}
            </nav>
            <main className={styles.main}>
                <header></header>
                <div className={styles.content}>{children}</div>
                <footer></footer>
            </main>
        </div>
    )
}
