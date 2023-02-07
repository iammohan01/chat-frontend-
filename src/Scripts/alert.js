import { message } from 'antd';


const alert = (type,content) => {
    switch (type) {
        case "success":
            message.success(content)
            break;
        case "error":
            message.error(content)
            break
        case "warning":
            message.warning(content)
            break
        default:
            break;
    }
   };

export default alert 