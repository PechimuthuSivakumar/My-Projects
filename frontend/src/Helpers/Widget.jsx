import React, { useState, useRef, useEffect } from "react";
import {
  SearchOutlined,
  FilterFilled,
  PlusOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Styles } from "../Helpers/ThemeCustomization";
import {
  Input,
  Button,
  Form,
  Select,
  Switch,
  InputNumber,
  message,
  Modal,
  Table,
  Space,
  Tag,
  Upload,
  Radio,
  Checkbox,
  Image,
  Breadcrumb,
  Drawer,
} from "antd";
import ImgCrop from "antd-img-crop";
import API from "../ApiService/ApiService";
import Highlighter from "react-highlight-words";
import { useNavigate } from "react-router-dom";
const ColorStyle = ReactQuill.Quill.import("attributors/style/color");
ReactQuill.Quill.register(ColorStyle, true);
class Widget {
  constructor() { }
  //Quil Input
  QuilField = ({ name, label, required, validation }) => {
    const modules = {
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link"],
          ["image"],
          [{ color: [] }],
          [{ align: [] }],
          ["clean"],
          ["blockquote", "code-block", "video"],
        ],
      },
    };

    return (
      <Form.Item
        className="w_100_p m_0"
        name={name}
        label={label}
        rules={[
          {
            required: required,
            message: validation,
          },
        ]}
      >
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={[
            "header",
            "bold",
            "italic",
            "underline",
            "strike",
            "list",
            "bullet",
            "link",
            "image",
            "color",
            "code-block",
            "video",
          ]}
        />
      </Form.Item>
    );
  };

  QuilFormListTwo = ({
    name,
    keyone,
    keytwo,
    requiredone,
    validationmsgone,
    addlabel,
    defaultvalue
  }) => {
    const [item, setItem] = useState(defaultvalue || ["", "", "", ""]);
    useEffect(() => {
      setItem(defaultvalue || ["", "", "", ""]);
    }, [defaultvalue]);
    const modules = {
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link"],
          ["image"],
          [{ color: [] }],
          [{ align: [] }],
          ["clean"],
          ["blockquote", "code-block", "video"],
        ],
      },
    };
    return (
      <Form.List name={name} initialValue={item}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <div key={key} className="col_1 g_20 col_1_sm new_set_field">
                <div className="col_1 g_20">
                  <div className="col_1 g_20 p_r">
                    <div className="d_f a_i_c g_15 is_correct">
                      Is it Correct?
                      <Form.Item
                        {...restField}
                        name={[name, keytwo]}
                        label={``}
                        valuePropName="checked"
                        defaultValue={false}

                      >
                        <Switch
                          size="small"
                          style={{ width: 40 }}
                          checked={false}

                        />
                      </Form.Item>
                      {fields.length > 1 && (
                        <PlusOutlined
                          style={{
                            color: "red",
                            padding: "3px",
                            border: "1px solid",
                            borderRadius: 100,
                            fontSize: 12,
                            width: "fit-content",
                            transform: "rotate(135deg)",
                          }}
                          onClick={() => remove(name)}
                        />
                      )}
                    </div>
                    <Form.Item
                      {...restField}
                      name={[name, keyone]}
                      rules={[
                        {
                          required: requiredone,
                          message: validationmsgone,
                        },
                      ]}
                      className="col_1 m_0"
                      label={`Option`}
                    >
                      <ReactQuill
                        theme="snow"
                        modules={modules}
                        formats={[
                          "header",
                          "bold",
                          "italic",
                          "underline",
                          "strike",
                          "list",
                          "bullet",
                          "link",
                          "image",
                          "color",
                          "code-block",
                          "video",
                        ]}
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </div>
                </div>
              </div>
            ))}

            <Form.Item>
              <Button
                type="link"
                onClick={() => add()}
                icon={
                  <PlusOutlined
                    style={{
                      color: "red",
                      padding: "3px",
                      border: "1px solid",
                      borderRadius: 100,
                      fontSize: 12,
                    }}
                  />
                }
                title={addlabel}
                style={{ color: "#656565", padding: 0 }}
              >
                {addlabel}
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    );
  };
  InputText = ({
    label = "",
    name = "",
    required = false,
    validationmsg = "",
    placeholder,
    icon = "",
    onclick,
    onchange,
    type = "text",
    classname = "",
    disabled = false,
  }) => {
    const rules = [
      {
        required,
        message: validationmsg,
      },
    ];

    return (
      <Form.Item
        label={label}
        name={name}
        rules={rules}
        className={`w_100_p m_0 ${classname}`}
      >
        <Input
          placeholder={placeholder}
          prefix={icon}
          onChange={onchange || undefined}
          onClick={onclick || undefined}
          type={type}
          size={Styles.input_size}
          disabled={disabled}
        />
      </Form.Item>
    );
  };

  InputPassword = ({
    label = "",
    name = "",
    placeholder = "",
    required = false,
    validationmsg = "",
    onclick = () => { },
    onchange = () => { },
    icon = "",
    classname = "",
    disabled = false,
  }) => {
    return (
      <Form.Item
        label={label}
        name={name}
        rules={[
          {
            required: required,
            message: validationmsg,
          },
        ]}
        className={`w_100_p m_0 ${classname}`}
      >
        <Input.Password
          prefix={icon}
          placeholder={placeholder}
          onClick={onclick}
          onChange={onchange}
          size={Styles.input_size}
          disabled={disabled}
        />
      </Form.Item>
    );
  };

  Button = ({
    type,
    btype = "button",
    text,
    loading = false,
    icon,
    classname,
    onclick,
    disabled = false,
  }) => {
    const [loadingOne, setLoadingOne] = useState(false);

    useEffect(() => {
      setLoadingOne(loading);
    }, [loading]);

    return (
      <Form.Item className={`w_100_p m_0 ${classname}`}>
        <Button
          type={type}
          htmlType={btype}
          loading={loadingOne}
          onClick={onclick}
          size={Styles.input_size}
          disabled={disabled}
        >
          {icon && <>{icon} </>} {text}
        </Button>
      </Form.Item>
    );
  };

  //Input Select
  InputSelect = ({
    label,
    name,
    required = false,
    validation,
    options,
    onchange,
    loading,
    multiple,
    placeholder = "Search to Select",
    classname,
    allowclear = true,
    autoclearsearchvalue = true,
    defaultopen = false,
    defaultvalue,
    disabled = false,
    maxtagcount,
    size = Styles.input_size,
  }) => {
    return (
      <Form.Item
        label={label}
        name={name}
        rules={[
          {
            required: required,
            message: validation,
          },
        ]}
        className={`w_100_p m_0 ${classname}`}
        initialValue={defaultvalue}
      >
        <Select
          value={defaultvalue}
          allowClear={allowclear}
          autoClearSearchValue={autoclearsearchvalue}
          defaultOpen={defaultopen}
          // defaultValue={defaultvalue}
          disabled={disabled}
          maxTagCount={maxtagcount}
          className="w_100_p"
          showSearch
          mode={multiple}
          placeholder={placeholder}
          optionFilterProp="children"
          onChange={onchange}
          loading={loading}
          size={size}
          filterOption={(input, option) =>
            (option?.label ?? "").includes(input)
          }
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
          options={options}
        />
      </Form.Item>
    );
  };

  //Input Switch
  InputSwitch = ({
    label,
    name,
    checked,
    loading,
    classname,
    defaultvalue,
  }) => {
    const [values, setValues] = useState(checked);

    useEffect(() => {
      setValues(checked);
    }, [checked]);

    const onChange = (newValue) => {
      setValues(newValue);
    };

    return (
      <Form.Item
        label={label}
        name={name}
        className={`w_100_p m_0 ${classname}`}
        initialValue={defaultvalue || false}
      >
        <Switch
          checked={values || false}
          onChange={onChange}
          size={Styles.input_size}
          loading={loading || false}
        />
      </Form.Item>
    );
  };

  //Input Form Number
  InputNumberField = ({
    label,
    name,
    required = false,
    validation,
    placeholder,
    icon,
    onclick,
    onchange,
    classname,
    disabled = false,
    min = 0,
    max = Infinity,
    size = Styles.input_size,
  }) => {
    const rules = [
      {
        required: required,
        message: validation,
      },
    ];

    return (
      <Form.Item
        label={label || ""}
        name={name || ""}
        rules={rules}
        className={`w_100_p m_0 ${classname}`}
      >
        <InputNumber
          placeholder={placeholder}
          prefix={icon || ""}
          onChange={onchange}
          onClick={onclick}
          type="number"
          size={size}
          disabled={disabled}
          min={min}
          max={max}
          className="w_100_p m_0"
        />
      </Form.Item>
    );
  };
  //Input Textarea
  InputTextarea = ({
    label,
    name,
    required,
    validation,
    onChange,
    className,
    disabled,
  }) => (
    <Form.Item
      label={label}
      name={name}
      rules={[
        {
          required,
          message: validation,
        },
      ]}
      className={`w_100_p m_0 ${className}`}
    >
      <Input.TextArea
        onChange={onChange}
        size={Styles.input_size}
        disabled={disabled || false}
      />
    </Form.Item>
  );

  //InputUpload
  InputUpload = ({
    label = "Upload:",
    upload,
    limit = 1,
    crop = false,
    imagesize,
    remove,
    accept,
    filelist,
    disabled,
    reset,
    setReset,
  }) => {
    const api = new API();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");
    const [fileList, setFileList] = useState(filelist || []);

    useEffect(() => {
      if (reset) {
        setFileList([]);
        setReset(false);
      }
    }, [filelist, reset, setReset]);

    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file) => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      setPreviewImage(file.url || file.preview);
      setPreviewOpen(true);
      setPreviewTitle(
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
      );
    };

    const handleChange = ({ fileList: newFileList }) => {
      setFileList(newFileList);
      upload && upload(newFileList.map((file) => file?.originFileObj));
    };

    const getBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });

    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );

    const renderUpload = fileList?.length < limit && (
      <Upload
        accept={accept || ""}
        action={api?.apiUrl}
        size={Styles.input_size}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={remove}
        disabled={disabled || false}
      >
        {uploadButton}
      </Upload>
    );

    return (
      <div className="img_m_b_8">
        <label className="upload_label">{label}</label>
        {crop ? (
          <ImgCrop
            rotationSlider
            aspect={imagesize || 150 / 150}
            modalProps={{ centered: true }}
          >
            {renderUpload}
          </ImgCrop>
        ) : (
          renderUpload
        )}
        <Modal
          open={previewOpen}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </div>
    );
  };

  //InputRadio
  InputRadioGroup = ({
    label,
    name,
    options,
    required,
    validationmsg,
    onchange,
    onclick,
    defaultvalue,
    classname,
  }) => {
    const [values, setValues] = useState(defaultvalue);

    useEffect(() => {
      setValues(defaultvalue);
    }, [defaultvalue]);

    return (
      <Form.Item
        label={label || ""}
        name={name || ""}
        rules={[
          {
            required: required,
            message: validationmsg,
          },
        ]}
        className={`w_100_p m_0 ${classname}`}
        initialValue={values}
      >
        <Radio.Group
          onClick={onclick || void 0}
          onChange={onchange || void 0}
          options={options || []}
          value={values}
          size={Styles?.input_size}
        />
      </Form.Item>
    );
  };

  //InputCheckbox
  InputCheckboxGroup = ({
    label = "",
    name = "",
    options = [],
    required = false,
    validationmsg = "",
    defaultvalue = [],
    onclick,
    onchange,
    classname = "",
  }) => {
    return (
      <Form.Item
        label={label}
        name={name}
        rules={[
          {
            required: required,
            message: validationmsg,
          },
        ]}
        className={`w_100_p m_0 ${classname}`}
        initialValue={defaultvalue}
      >
        <Checkbox.Group
          size={Styles.input_size}
          options={options}
          onChange={onchange}
          onClick={onclick}
        />
      </Form.Item>
    );
  };

  //Datatables
  DataTables = ({
    rowSelections,
    columns,
    data,
    loading,
    bordered,
    rowcheck = false,
    pagnation = {},
    onchange = () =>
      (page = 1, pageSize = 10) => {
        return { page, pageSize };
      },
  }) => {
    const tableRef = useRef(null);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const onSelectChange = (newSelectedRowKeys) => {
      setSelectedRowKeys(newSelectedRowKeys);
      rowSelections(newSelectedRowKeys);
    };
    const rowSelection = {
      selectedRowKeys,
      onChange: onSelectChange,
    };
    return (
      <Table
        rowSelection={rowcheck ? rowSelection : undefined}
        columns={columns}
        loading={loading}
        dataSource={data || []}
        bordered={bordered || false}
        size={Styles.table_size}
        scroll={{
          x: 1200,
        }}
        ref={tableRef}
        pagination={{
          current: pagnation?.currentPage,
          pageSize: pagnation?.perPage,
          total: pagnation?.itemCount,
          onChange: (page, pageSize) => {
            onchange(page, pageSize);
          },
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
          onShowSizeChange: (current, size) => {

          },
        }}
      />
    );
  };

  //table filter
  tableService = (dataIndex) => {
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
      clearFilters();
      setSearchText("");
    };
    const getColumnSearchProps = (dataIndex) => ({
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div
          style={{
            padding: 8,
          }}
        >
          <Input
            size={Styles.input_size}
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{
              marginBottom: 8,
              display: "block",
            }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size={Styles.input_size}
            >
              Search
            </Button>
            <Button
              onClick={() => clearFilters && handleReset(clearFilters)}
              size={Styles.input_size}
            >
              Reset
            </Button>
            <Button
              type="link"
              size={Styles.input_size}
              onClick={() => {
                confirm({
                  closeDropdown: false,
                });
                setSearchText(selectedKeys[0]);
                setSearchedColumn(dataIndex);
              }}
            >
              Filter
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <FilterFilled
          style={{
            color: filtered ? "#1890ff" : undefined,
          }}
        />
      ),
      onFilter: (value, record) =>
        record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase()),
      onFilterDropdownOpenChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
      render: (text) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{
              backgroundColor: "var(--bg)",
              color: "#fff",
              padding: 0,
            }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ""}
          />
        ) : (
          text
        ),
    });
    return getColumnSearchProps(dataIndex);
  };
  //table status
  statusTable = (status) => {
    return (_, { status }) => (
      <>
        {status.map((statu) => {
          let color;
          let text;
          // (approved, not approved, returned for correction, under review,
          //   postponed).
          if (statu == 0) {
            color = "red";
            text = "not approved";
          } else if(statu == 1) {
            color = "orange";
            text = "returned for correction";
          } else if(statu == 2){
            color = "blue";
            text = "Assigned to HR";
          } else if(statu == 3){
            color = "lightgreen";
            text = "under review";
          }else if(statu == 4){
            color = "purple";
            text = "postponed";
          }else if (statu == 5) {
            color = "green";
            text = "Apporved";
          }
          return (
            <Tag color={color} key={statu} size={Styles.input_size}>
              {text}
            </Tag>
          );
        })}
      </>
    );
  };
  statusPublishTable = (status) => {
    return (_, { status }) => (
      <>
        {status.map((statu) => {
          let color;
          let text;
          if (statu == 1) {
            color = "green";
            text = "Published";
          } else {
            color = "orange";
            text = "Draft";
          }
          return (
            <Tag color={color} key={statu} size={Styles.input_size}>
              {text}
            </Tag>
          );
        })}
      </>
    );
  };

  //Model
  PopupModel = ({ title, open, footer = null, oncancel, width, body }) => {
    return (
      <>
        <Modal
          title={title}
          open={open}
          footer={footer}
          onCancel={oncancel}
          width={width}
        >
          {body}
        </Modal>
      </>
    );
  };

  //

  showMessage = (type, messageText) => {
    return message[type](messageText);
  };

  showMessageModdel = (type, title, content) => {
    return Modal[type]({
      title: title,
      content: content,
    });
  };

  FormView = ({ label, value }) => {
    return (
      <div className="d_f f_w_w g_10">
        <b>{label + ": "}</b> <span>{value}</span>
      </div>
    );
  };

  FormTag = ({ label, color }) => {
    return <Tag color={color}> {label} </Tag>;
  };

  ImageView = ({ url, alt, size }) => {
    return <Image src={url} height={size || 35} alt={alt || "Image"} />;
  };

  BreadcrumbDynamic = ({ title }) => {
    const navigate = useNavigate();
    const split_title = title.split(",");
    const items = [
      {
        title: "Home",
      },
    ];
    split_title.forEach((splitItem) => {
      items.push({
        title: splitItem.trim(),
      });
    });
    return (
      <div className="table_head">
        <p onClick={() => navigate(-1)} className="go_back">
          <ArrowLeftOutlined /> &nbsp;Back
        </p>
        <Breadcrumb items={items} />
      </div>
    );
  };

  Drawer = ({
    title,
    open,
    footer,
    onclose,
    width,
    body,
    placement,
    classname,
  }) => {
    return (
      <div className={classname}>
        <Drawer
          title={title}
          placement={placement || "right"}
          onClose={onclose}
          open={open}
          footer={footer || null}
          width={width || 700}
        >
          <div className="col_1 p_20">{body}</div>
        </Drawer>
      </div>
    );
  };
}

export default new Widget();
