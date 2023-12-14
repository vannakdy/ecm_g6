import {Button, Checkbox, DatePicker, Input, Radio, Spin, Table} from "antd";
import {EditFilled, SearchOutlined,DeleteFilled,ImportOutlined} from "@ant-design/icons"


function HomePage(){ // 

    return (
        <div>
            <h1>HomePage</h1>
            <Button>default button</Button>
            <Button type="primary">primary</Button>
            <Button type="dashed">dashed</Button>
            <Button type="text">text</Button>
            <Button type="link">link</Button>
            <Button type="primary" shape="circle" icon={<SearchOutlined />}></Button>
            <Button><EditFilled /></Button>
            <Button type="dashed" danger><DeleteFilled /></Button>
            <Button>Import <ImportOutlined /></Button>
            <Button style={{backgroundColor:"green",color:"white"}}><ImportOutlined /> Import</Button>
            <Input />
            <DatePicker />
            <Radio />
            <Checkbox />
            <Spin spinning={true} />
            <button>Click</button>
        </div>
    )
}

export default HomePage;