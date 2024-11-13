import React, { useState } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Link } from "react-router-dom";
import "./style.css";
import { sideBarList } from "../../../data/mockData";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
const SidebarItem = ({ colors, isCollapsed }) => {
  const [openDropdown, setOpenDropdown] = useState({});
  const [openSubDropdown, setOpenSubDropdown] = useState({});

  const toggleDropdown = (index) => {
    setOpenDropdown((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const toggleSubDropdown = (parentIndex, subIndex) => {
    setOpenSubDropdown((prevState) => ({
      ...prevState,
      [parentIndex]: {
        ...(prevState[parentIndex] || {}),
        [subIndex]: !prevState[parentIndex]?.[subIndex],
      },
    }));
  };

  return (
    <>
      <Link
        to="/dashboard"
        style={{
          textDecoration: "none",
          color: "white",
        }}
      >
        <ListItem className="active-link sidebar-list-item">
          <ListItemIcon style={{ color: "white", minWidth: "30px" }}>
            <HomeOutlinedIcon style={{ color: "white" }} />
          </ListItemIcon>
          {!isCollapsed && <ListItemText> Dashboard </ListItemText>}
        </ListItem>
      </Link>

      <Link
        to="/users"
        style={{
          textDecoration: "none",
          color: "white",
        }}
      >
        <ListItem className="active-link sidebar-list-item">
          <ListItemIcon style={{ color: "white", minWidth: "30px" }}>
            <AccountCircleIcon style={{ color: "white" }} />
          </ListItemIcon>
          {!isCollapsed && <ListItemText> Users </ListItemText>}
        </ListItem>
      </Link>

      {/* <Link
        to="/add-vlog"
        style={{
          textDecoration: "none",
          color: "white",
        }}
      >
        <ListItem className="active-link sidebar-list-item">
          <ListItemIcon style={{ color: "white", minWidth: "30px" }}>
            <AddCircleIcon style={{ color: "white" }} />
          </ListItemIcon>
          {!isCollapsed && <ListItemText> Add Vlog </ListItemText>}
        </ListItem>
      </Link> */}

      {/* <Link
        to="/add-certificate"
        style={{
          textDecoration: "none",
          color: "white",
        }}
      >
        <ListItem className="active-link sidebar-list-item">
          <ListItemIcon style={{ color: "white", minWidth: "30px" }}>
            <AddCircleIcon style={{ color: "white" }} />
          </ListItemIcon>
          {!isCollapsed && <ListItemText> Add Certificate </ListItemText>}
        </ListItem>
      </Link> */}

      {/* <List>
        {sideBarList?.map((item, parentIndex) => (
          <div key={parentIndex}>
            <ListItem
              sx={{
                transition: "transform 0.2s cubic-bezier(0.42, 0, 0.58, 1)",
              }}
              button
              onClick={() => toggleDropdown(parentIndex)}
              className={`active-link sidebar-list-item ${
                item.label === "Competitive Type" ? "disabled" : ""
              }`}
              disabled={item.label === "Competitive Type"}
            >
              <ListItemIcon style={{ color: "white", minWidth: "30px" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText>{item.label}</ListItemText>
              {item.dropdownData &&
                item.dropdownData.length > 0 &&
                (openDropdown[parentIndex] ? <ExpandLess /> : <ExpandMore />)}
            </ListItem>

            <Collapse
              in={openDropdown[parentIndex]}
              timeout="auto"
              unmountOnExit
            >
              <List
                component="div"
                disablePadding
                style={{
                  textDecoration: "none",
                  color: "white",
                  padding: "0px 0px 0px 20px",
                  margin: "0px",
                }}
              >
                {item.dropdownData &&
                  item.dropdownData.map((subitem, subIndex) => (
                    <div key={subIndex}>
                      <Link
                        to={subitem.link || null}
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        <ListItem
                          sx={{
                            margin: "0px",
                            padding: "0px 15px 0px 0px",
                            transition:
                              "transform 0.2s cubic-bezier(0.42, 0, 0.58, 1)",
                          }}
                          button
                          onClick={() =>
                            toggleSubDropdown(parentIndex, subIndex)
                          }
                          className={`active-link sidebar-list-item ${
                            subitem.label === "Competitive Type"
                              ? "disabled"
                              : ""
                          }`}
                          disabled={subitem.label === "Competitive Type"}
                        >
                          <ListItemIcon
                            style={{ color: "white", minWidth: "30px" }}
                          >
                            {subitem.icon}
                          </ListItemIcon>
                          <ListItemText style={{ color: "white" }}>
                            {subitem.label}
                          </ListItemText>
                          {subitem.subDropdownData &&
                          subitem.subDropdownData.length > 0 ? (
                            openSubDropdown[parentIndex] &&
                            openSubDropdown[parentIndex][subIndex] ? (
                              <ExpandLess />
                            ) : (
                              <ExpandMore />
                            )
                          ) : null}
                        </ListItem>
                      </Link>
                      <Collapse
                        in={
                          openSubDropdown[parentIndex] &&
                          openSubDropdown[parentIndex][subIndex]
                        }
                        timeout="auto"
                        unmountOnExit
                      >
                        <List component="div" disablePadding>
                          {subitem.subDropdownData &&
                            subitem.subDropdownData.map(
                              (subSubItem, subSubIndex) => (
                                <Link
                                  key={subSubIndex}
                                  to={subSubItem.link}
                                  style={{
                                    textDecoration: "none",
                                    color: "white",
                                  }}
                                >
                                  <ListItem
                                    sx={{
                                      margin: "0px",
                                      padding: "0px 0px 0px 10px",
                                      transition:
                                        "transform 0.2s cubic-bezier(0.42, 0, 0.58, 1)",
                                    }}
                                    button
                                    className={`active-link sidebar-list-item ${
                                      subSubItem.label === "Competitive Type"
                                        ? "disabled"
                                        : ""
                                    }`}
                                    disabled={
                                      subSubItem.label === "Competitive Type"
                                    }
                                  >
                                    <ListItemIcon
                                      style={{ minWidth: "30px" }}
                                    />
                                    <ListItemText>
                                      {subSubItem.label}
                                    </ListItemText>
                                  </ListItem>
                                </Link>
                              )
                            )}
                        </List>
                      </Collapse>
                    </div>
                  ))}
              </List>
            </Collapse>
          </div>
        ))}
      </List> */}
    </>
  );
};

export default SidebarItem;
