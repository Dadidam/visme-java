import { connect } from "react-redux";
import React, { useState } from "react";
import { Table, Input, InputNumber, Popconfirm, Form, Button } from "antd";
import { deleteUser } from "actions/user";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const EditableTable = ({ list, deleteUser }) => {
  const [form] = Form.useForm();
  const [data, setData] = useState(list);
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record) => record.id === editingKey;

  const edit = (record) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.id);
  };

  const onDelete = (record) => {
    deleteUser(record.id);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.id);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "Full Name",
      dataIndex: "name",
      width: "30%",
      editable: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "40%",
      editable: true,
    },
    {
      title: "Operation",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <div>
            <Button
              type="link"
              onClick={() => save(record.id)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Button>

            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <Button type="link" danger>
                Cancel
              </Button>
            </Popconfirm>
          </div>
        ) : (
          <div>
            <Button
              type="link"
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              Edit User Info
            </Button>
            <Popconfirm
              title="Sure to delete the user?"
              onConfirm={() => onDelete(record)}
            >
              <Button type="link" danger>
                Delete User
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={list}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={false}
      />
    </Form>
  );
};

function mapStateToProps({ user }) {
  return { user };
}

export default connect(mapStateToProps, { deleteUser })(EditableTable);
