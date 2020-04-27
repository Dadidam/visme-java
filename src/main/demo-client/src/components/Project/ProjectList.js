import { connect } from "react-redux";
import formatDate from "helpers/DateHelper";
import React, { useState } from "react";
import { Table, Input, InputNumber, Popconfirm, Form, Tag, Button } from "antd";
import { deleteProject, toggleProjectType } from "actions/project";

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

const EditableTable = ({ list, deleteProject, toggleProjectType }) => {
  const [form] = Form.useForm();
  const [data, setData] = useState(list);
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record) => record.id === editingKey;

  const edit = (record) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.id);
  };

  const onDelete = (record) => {
    deleteProject(record.id);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const toggle = (record) => {
    toggleProjectType(record.id);
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
      title: "Title",
      dataIndex: "title",
      width: "30%",
      editable: true,
      render: (_, record) => {
        return record.type ? (
          <span>
            {record.title} <Tag color="#A4BCD4">favorite</Tag>
          </span>
        ) : (
          record.title
        );
      },
    },
    {
      title: "Added",
      dataIndex: "creationDate",
      width: "15%",
      editable: false,
      render: (_, record) => {
        return formatDate(record.creationDate);
      },
    },
    {
      title: "Modified",
      dataIndex: "modificationDate",
      width: "15%",
      editable: false,
      render: (_, record) => {
        return formatDate(record.modificationDate);
      },
    },
    {
      title: "operation",
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
              Edit
            </Button>
            <Popconfirm
              title="Sure to delete the project?"
              onConfirm={() => onDelete(record)}
            >
              <Button type="link" danger>
                Delete Project
              </Button>
            </Popconfirm>
            <Button type="link" warning onClick={() => toggle(record)}>
              {record.type ? "Remove from Favorite" : "Add to Favorite"}
            </Button>
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

function mapStateToProps({ project }) {
  return { project };
}

export default connect(mapStateToProps, { deleteProject, toggleProjectType })(
  EditableTable
);
