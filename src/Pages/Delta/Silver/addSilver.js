import { Button, Input, Typography, Select, Row} from 'antd';
import React,{useState} from 'react';
import axios from 'axios';
import SchemaTable from '../../../Components/Schema/SchemaTable';

const {Title, Text} = Typography;

function SelectDropdown({ value, onChange}) {
    const items =   value.map(field => ({
      value: field.fieldname,
      label: field.fieldname
    }) )
    return (
    <>
    <Select
      showSearch
    //   placeholder="Bảng dữ liệu"
      optionFilterProp="children"
      onChange={onChange}
    //   onSearch={onSearch}
      // filterOption={(input, option) =>
      //   (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
      // }
      options={items}
      defaultValue={value}
    />
    </>)
  }

  function SelectMultiDropdown({ value, onChange}) {
    const items =   value.map(field => ({
      value: field.name,
      label: field.name
    }) )
    return (
    <>
    <Select
            mode="multiple"
      showSearch
    //   placeholder="Bảng dữ liệu"
      optionFilterProp="children"
      onChange={onChange}
    //   onSearch={onSearch}
      // filterOption={(input, option) =>
      //   (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
      // }
      options={items}
      // defaultValue={value}
    />
    </>)
  }
  function SelectTableDropdown({ value, onChange}) {
    const items =   value.map((table, index) => ({
      value: index,
      label: table.name
    }) )
    return (
    <>
    <Select
      showSearch
    //   placeholder="Bảng dữ liệu"
      optionFilterProp="children"
      onChange={onChange}
    //   onSearch={onSearch}
      // filterOption={(input, option) =>
      //   (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
      // }
      options={items}
      defaultValue={value}
    />
    </>)
  }

const DefineSilver = (props) => {
    // table info
    const projectName=props.projectName?props.projectName:'MBF';
    const [tableName, setTableName] = useState("");
    const [schema, setSchema]=useState();
    const [fields, selectFields]=useState([]);

    // source table
    const [sourceTable,setSourceTable]=useState(
      // {
      //   "description": "",
      //   "name": "goi",
      //   "project": "MBF",
      //   "schema": [
      //     {
      //         "fieldname": "hash_isdn",
      //         "datatype": "String",
      //         "description": ""
      //     },
      //     {
      //         "fieldname": "code",
      //         "datatype": "String",
      //         "description": ""
      //     },
      //     {
      //         "fieldname": "charge_price",
      //         "datatype": "Float",
      //         "description": ""
      //     },
      //     {
      //         "fieldname": "ngay_dk",
      //         "datatype": "Datetime",
      //         "description": ""
      //     },
      //     {
      //         "fieldname": "reg_code",
      //         "datatype": "String",
      //         "description": ""
      //     }
      // ],
      //   "typ": "bronze"
      // }
      );
    
    // select attributes info 
    const [otherTables, setOtherTables]=useState([
      // {
      //   "description": "",
      //   "name": "goi",
      //   "project": "MBF",
      //   "schema": [],
      //   "typ": "bronze"
      // }
    ]);
    const getOtherTables = () => {
        console.log('get table metadata thôi')
        axios.get('/tables/metadata?project_name='+projectName).then(
            (res)=>{
              // res = {'data':[]}
                console.log(res);
                // otherTables.filter()
                // var other = res.data.filter((table)=>table.name==="DK_GOI_T1");
                // console.log('fitered rồi nè, nhwos xóa đi nha',other)
                setOtherTables(res.data);
                
                // setOtherTables(res.data.filter((table)=>length(table.schema)>1));
            }
        ).then(()=>console.log("get xong nha"))
    }

    const setSelectedSchema = (value)=>{
        setSchema(value);
        console.log(value)
    }


    const createSilverTable = ()=> {
        // Mapping ra sql
        // Hoặc là tạo post :
        // {source, 
        //     sink,
        //     sql}



        axios.post('/create_silver', {
            project_name : projectName,
            table_name: tableName,
            schema: schema,
            sql: 'select '+ fields.join(',') + ' from delta. `/data/'+projectName+'/bronze/'+sourceTable.name+'`'
        }       )

        
    }

    return <>
        <div>---------------------------------------------</div>
            <Title level={5}>Thông tin bảng dữ liệu đầy đủ</Title>
            <Text>Tên bảng: <input type="text" onBlur={(e)=>{setTableName(e.target.value)}}/>  </Text>
            <Row/>
            <Text><Button onClick={getOtherTables}>*</Button> Bảng dữ liệu gốc: <SelectTableDropdown value = {otherTables} onChange={(e)=>{setSourceTable(otherTables[e]); console.log(otherTables[e])}} /></Text>
            
            <Text>Các trường thuộc tính<SelectMultiDropdown value={sourceTable?sourceTable.schema:[]} onChange = {selectFields}/></Text>
            
            <SchemaTable schema = {schema} updateSchema = {setSchema}/>
            <Button onClick={createSilverTable} >Tạo bảng silver</Button>
        <div>---------------------------------------------</div>
    </>
}

export default DefineSilver;