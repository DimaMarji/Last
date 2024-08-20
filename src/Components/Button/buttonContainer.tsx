import "./styles.scss"
import {Button as AntdButton} from 'antd';
import {IButtonProps} from "./interface";
import * as React from "react";

const Button: React.FC<IButtonProps> = ({className, ...props}) => {
    return <AntdButton className={`default-button ${className ?? ""}`} {...props}/>
}

export default Button