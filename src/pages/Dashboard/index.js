import React, { Fragment, useState, useEffect } from "react";
import "./style.css";
import intelpixel from "../../images/intelpixel.png";
import xray from "../../images/xray.jpg"; 
import avatar from "../../images/0.jpg"; 
import { getFiltersApi, getElasticSearchApi } from "../../services/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

let Dashboard = (props) => {
  const [count, setCount] = useState(true);
  const [changeCheck, setChangeCheck] = useState(false);
  const [changeModality, setChangeModality] = useState(false);
  const [changeBodyPart, setChangeBodyPart] = useState(false);
  const [arrElasticSearch, setArrElasticSearch] = useState([]);
  const [rating, setRating] = useState(2);
  const [age, setAge] = useState(100);
  const [arrGender, setArrGender] = useState([
    { name: "Female", check: false },
    { name: "Male", check: false },
  ]);
  const [arrDemographic, setArrDemographic] = useState([]);
  const [arrFinding, setArrFinding] = useState([]);
  const [arrManufacturer, setArrManufacturer] = useState([]);
  const [arrModality, setArrModality] = useState([]);
  const [arrDisease, setArrDisease] = useState([]);
  const [arrProcedure, setArrProcedure] = useState([]);
  const [arrTechnical, setArrTechnical] = useState([]);
  const [arrBodyPart, setArrBodyPart] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [startDateOpen, setStartDateOpen] = useState(false);

  useEffect(() => {
    getFilters("finding", "");
    getFilters("demographic", "");
    getFilters("modality", "");
  }, []);

  const convertQueryParam = (arr) => {
    var str = "";
    arr.forEach((element) => {
      if (element.check) str = str + "," + element.name.toLowerCase();
    });
    str = str == "" ? "" : str.substring(1);
    return str;
  };

  useEffect(() => {
    var query = "";
    var queryModality = convertQueryParam(arrModality);
    var queryBodyPart = convertQueryParam(arrBodyPart);

    if (queryModality != "") {
      query = `?modality=${queryModality}`;
    }
    getFilters("manufacturer", query);
    getFilters("organ/based/on/modality", query);
    getFilters("technicalspecification", query);
  }, [changeModality]);

  useEffect(() => {
    var query = "";
    var queryModality = convertQueryParam(arrModality);
    var queryBodyPart = convertQueryParam(arrBodyPart);

    if (queryModality != "") {
      query = `?modality=${queryModality}`;
    }
    if (queryBodyPart != "") {
      if (query == "") {
        query = `?body_part=${queryBodyPart}`;
      } else {
        query = query + `&body_part=${queryBodyPart}`;
      }
    }
    getFilters("disease/based/on/modality/bodypart", query);
    getFilters("procedure/based/on/modality/bodypart", query);
  }, [changeBodyPart]);

  useEffect(() => {
    var query = `?age=${age}&ratings=${rating}`;
    var queryGender = convertQueryParam(arrGender);
    var queryFinding = convertQueryParam(arrFinding);
    var queryModality = convertQueryParam(arrModality);
    var queryManufacturer = convertQueryParam(arrManufacturer);
    var queryDemographic = convertQueryParam(arrDemographic);
    var queryDisease = convertQueryParam(arrDisease);
    var queryProcedure = convertQueryParam(arrProcedure);
    var queryTechnical = convertQueryParam(arrTechnical);
    var queryBodyPart = convertQueryParam(arrBodyPart);
    if (queryGender != "") query = query + `&gender=${queryGender}`;
    if (queryFinding != "") query = query + `&findings=${queryFinding}`;
    if (queryModality != "") query = query + `&modality=${queryModality}`;
    if (queryManufacturer != "")
      query = query + `&manufacturer=${queryManufacturer}`;
    if (queryDemographic != "")
      query = query + `&demographics=${queryDemographic}`;
    if (queryDisease != "") query = query + `&diesease=${queryDisease}`;
    if (queryProcedure != "") query = query + `&procedure=${queryProcedure}`;
    if (queryTechnical != "")
      query = query + `&technical_specifications=${queryTechnical}`;
    if (queryBodyPart != "") query = query + `&organ=${queryBodyPart}`;
    getElasticSearch(query);
  }, [changeCheck]);

  const getElasticSearch = (queryParam) => {
    getElasticSearchApi(queryParam)
      .then((res) => {
        if (res.status) {
          setArrElasticSearch(res.data);
        } else {
          setArrElasticSearch([]);
        }
      })
      .catch((e) => {
        console.log("ERROR");
        console.log(e);
      });
  };

  const getFilters = (filterType, queryParam) => {
    getFiltersApi(filterType, queryParam)
      .then((res) => {
        if (res.status) {
          var arr = [];
          res.data.forEach((element) => {
            arr.push({ ...element, check: false });
          });
          switch (filterType) {
            case "finding":
              setArrFinding(arr);
              break;
            case "demographic":
              setArrDemographic(arr);
              break;
            case "modality":
              setArrModality(arr);
              break;
            case "manufacturer":
              setArrManufacturer(arr);
              break;
            case "organ/based/on/modality":
              setArrBodyPart(arr);
              break;
            case "technicalspecification":
              setArrTechnical(arr);
              break;
            case "disease/based/on/modality/bodypart":
              setArrDisease(arr);
              break;
            case "procedure/based/on/modality/bodypart":
              setArrProcedure(arr);
              break;

            default:
              break;
          }
        } else {
          switch (filterType) {
            case "finding":
              setArrFinding([]);
              break;
            case "demographic":
              setArrDemographic([]);
              break;
            case "modality":
              setArrModality([]);
              break;
            case "manufacturer":
              setArrManufacturer([]);
              break;
            case "organ/based/on/modality":
              setArrBodyPart([]);
              break;
            case "technicalspecification":
              setArrTechnical([]);
              break;
            case "disease/based/on/modality/bodypart":
              setArrDisease([]);
              break;
            case "procedure/based/on/modality/bodypart":
              setArrProcedure([]);
              break;

            default:
              break;
          }
        }
      })
      .catch((e) => {
        console.log("ERROR");
        console.log(e);
      });
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <aside className="main-sidebar col-12 col-md-3 col-lg-2 px-0">
          <div className="main-navbar">
            <nav className="navbar align-items-stretch navbar-light bg-white flex-md-nowrap border-bottom p-0">
              <a className="navbar-brand w-100 mr-0" href="#">
                <span className="d-table m-auto">
                  <img
                    id="main-logo"
                    className="d-inline-block align-top mr-1"
                    src={intelpixel}
                  />
                  <span className="d-none d-md-inline ml-1"></span>
                </span>
              </a>
              <a className="toggle-sidebar d-sm-inline d-md-none d-lg-none">
                <i className="material-icons">&#xE5C4;</i>
              </a>
            </nav>
          </div>

          <form className="main-sidebar__search w-100 border-right d-sm-flex d-md-none d-lg-none">
            <div className="input-group input-group-seamless ml-3">
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <i className="fas fa-search"></i>
                </div>
              </div>
              <input
                className="navbar-search form-control"
                type="text"
                placeholder="Search for something..."
                aria-label="Search"
              ></input>
            </div>
          </form>

          <div className="nav-wrapper">
            <ul className="nav flex-column">
              <li className="nav-item">
                <h3>RATING</h3>
                <div className="custom-control custom-radio mb-1">
                  <input
                    type="radio"
                    className="custom-control-input"
                    id="Rating < 3"
                    name="rating"
                    checked={rating == 2}
                    onChange={(e) => {
                      setRating(2);
                      setChangeCheck(!changeCheck);
                    }}
                  ></input>
                  <label className="custom-control-label" htmlFor="Rating < 3">
                    {"Rating < 3"}
                  </label>
                </div>
                <div className="custom-control custom-radio mb-1">
                  <input
                    type="radio"
                    className="custom-control-input"
                    id="Rating 3-4"
                    name="rating"
                    checked={rating == 4}
                    onChange={(e) => {
                      setRating(4);
                      setChangeCheck(!changeCheck);
                    }}
                  ></input>
                  <label className="custom-control-label" htmlFor="Rating 3-4">
                    {"Rating 3-4"}
                  </label>
                </div>
                <div className="custom-control custom-radio mb-1">
                  <input
                    type="radio"
                    className="custom-control-input"
                    id="Rating > 4"
                    name="rating"
                    checked={rating == 5}
                    onChange={(e) => {
                      setRating(5);
                      setChangeCheck(!changeCheck);
                    }}
                  ></input>
                  <label className="custom-control-label" htmlFor="Rating > 4">
                    {"Rating > 4"}
                  </label>
                </div>
              </li>

              <li className="nav-item">
                <h3>GENDER</h3>
                {arrGender.map((element, index) => (
                  <div
                    key={index}
                    className="custom-control custom-checkbox mb-1"
                  >
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id={"GENDER" + (element.name ?? "")}
                      checked={element.check ?? false}
                      onChange={(e) => {
                        arrGender[index].check = !arrGender[index].check;
                        setArrGender([...arrGender]);
                        setChangeCheck(!changeCheck);
                      }}
                    ></input>
                    <label
                      className="custom-control-label"
                      htmlFor={"GENDER" + (element.name ?? "")}
                    >
                      {element.name ?? ""}
                    </label>
                  </div>
                ))}
              </li>

              {arrFinding.length > 0 && (
                <li className="nav-item">
                  <h3>FINDINGS</h3>
                  {arrFinding.map((element, index) => (
                    <div
                      key={index}
                      className="custom-control custom-checkbox mb-1"
                    >
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id={"FINDINGS" + (element.name ?? "")}
                        checked={element.check ?? false}
                        onChange={(e) => {
                          arrFinding[index].check = !arrFinding[index].check;
                          setArrFinding([...arrFinding]);
                          setChangeCheck(!changeCheck);
                        }}
                      ></input>
                      <label
                        className="custom-control-label"
                        htmlFor={"FINDINGS" + (element.name ?? "")}
                      >
                        {element.name ?? ""}
                      </label>
                    </div>
                  ))}
                </li>
              )}

              {arrModality.length > 0 && (
                <li className="nav-item">
                  <h3>MODALITY</h3>
                  {arrModality.map((element, index) => (
                    <div
                      key={index}
                      className="custom-control custom-checkbox mb-1"
                    >
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id={"MODALITY" + (element.name ?? "")}
                        checked={element.check ?? false}
                        onChange={(e) => {
                          arrModality[index].check = !arrModality[index].check;
                          setArrModality([...arrModality]);
                          setChangeCheck(!changeCheck);
                          setChangeModality(!changeModality);
                        }}
                      ></input>
                      <label
                        className="custom-control-label"
                        htmlFor={"MODALITY" + (element.name ?? "")}
                      >
                        {element.name ?? ""}
                      </label>
                    </div>
                  ))}
                </li>
              )}
              {arrManufacturer.length > 0 && (
                <li className="nav-item">
                  <h3>MANUFACTURER</h3>
                  {arrManufacturer.map((element, index) => (
                    <div
                      key={index}
                      className="custom-control custom-checkbox mb-1"
                    >
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id={"MANUFACTURER" + (element.name ?? "")}
                        checked={element.check ?? false}
                        onChange={(e) => {
                          arrManufacturer[index].check = !arrManufacturer[index]
                            .check;
                          setArrManufacturer([...arrManufacturer]);
                          setChangeCheck(!changeCheck);
                        }}
                      ></input>
                      <label
                        className="custom-control-label"
                        htmlFor={"MANUFACTURER" + (element.name ?? "")}
                      >
                        {element.name ?? ""}
                      </label>
                    </div>
                  ))}
                </li>
              )}

              <li className="nav-item">
                <h3>AGE</h3>
                <div className="age-range mb-1">
                  <input
                    onPointerUp={() => {
                      setChangeCheck(!changeCheck);
                    }}
                    type="range"
                    value={age}
                    min="0.1"
                    max="100"
                    onChange={(e) => {
                      setAge(e.target.value);
                    }}
                  ></input>
                </div>
              </li>

              {arrDemographic.length > 0 && (
                <li className="nav-item">
                  <h3>DEMOGRAPHICS</h3>
                  {arrDemographic.map((element, index) => (
                    <div
                      key={index}
                      className="custom-control custom-checkbox mb-1"
                    >
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id={"DEMOGRAPHICS" + (element.name ?? "")}
                        checked={element.check ?? false}
                        onChange={(e) => {
                          arrDemographic[index].check = !arrDemographic[index]
                            .check;
                          setArrDemographic([...arrDemographic]);
                          setChangeCheck(!changeCheck);
                        }}
                      ></input>
                      <label
                        className="custom-control-label"
                        htmlFor={"DEMOGRAPHICS" + (element.name ?? "")}
                      >
                        {element.name ?? ""}
                      </label>
                    </div>
                  ))}
                </li>
              )}
            </ul>
          </div>
        </aside>

        <main className="main-content col-lg-10 col-md-9 col-sm-12 p-0 offset-lg-2 offset-md-3">
          <div className="main-navbar sticky-top bg-white">
            <nav className="navbar align-items-stretch navbar-light flex-md-nowrap p-0">
              <form
                action="#"
                className="main-navbar__search w-100 d-none d-md-flex d-lg-flex"
              >
                <div className="input-group input-group-seamless ml-3">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <i className="fas fa-search"></i>
                    </div>
                  </div>
                  <input
                    className="navbar-search form-control"
                    type="text"
                    placeholder="Search for something..."
                    aria-label="Search"
                  ></input>{" "}
                </div>
              </form>
              <ul className="navbar-nav border-left flex-row header-user-wrap">
                <li>
                  <div
                    className="dropdown-menu dropdown-menu-small"
                    aria-labelledby="dropdownMenuLink"
                  >
                    <a className="dropdown-item" href="#">
                      <div className="notification__icon-wrapper">
                        <div className="notification__icon">
                          <i className="material-icons">&#xE6E1;</i>
                        </div>
                      </div>
                      <div className="notification__content">
                        <span className="notification__category">
                          Analytics
                        </span>
                        <p>
                          Your website’s active users count increased by
                          <span className="text-success text-semibold">
                            28%
                          </span>{" "}
                          in the last week. Great job!
                        </p>
                      </div>
                    </a>
                    <a className="dropdown-item" href="#">
                      <div className="notification__icon-wrapper">
                        <div className="notification__icon">
                          <i className="material-icons">&#xE8D1;</i>
                        </div>
                      </div>
                      <div className="notification__content">
                        <span className="notification__category">Sales</span>
                        <p>
                          Last week your store’s sales count decreased by
                          <span className="text-danger text-semibold">
                            5.52%
                          </span>
                          . It could have been worse!
                        </p>
                      </div>
                    </a>
                    <a
                      className="dropdown-item notification__all text-center"
                      href="#"
                    >
                      {" "}
                      View all Notifications{" "}
                    </a>
                  </div>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle text-nowrap px-3"
                    data-toggle="dropdown"
                    href="#"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <img
                      className="user-avatar rounded-circle mr-2"
                      src={avatar}
                    />
                    <span className="d-md-inline-block">Sierra Brooks</span>
                  </a>
                  <div className="dropdown-menu dropdown-menu-small">
                    <a className="dropdown-item" href="#">
                      <i className="material-icons">&#xE7FD;</i> Profile
                    </a>

                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item text-danger" href="#">
                      <i className="material-icons text-danger">&#xE879;</i>{" "}
                      Logout{" "}
                    </a>
                  </div>
                </li>
              </ul>
              <nav className="nav">
                <a
                  href="#"
                  className="nav-link nav-link-icon toggle-sidebar d-sm-inline d-md-none text-center border-left"
                  data-toggle="collapse"
                  data-target=".header-navbar"
                  aria-expanded="false"
                  aria-controls="header-navbar"
                >
                  <i className="material-icons">&#xE5D2;</i>
                </a>
              </nav>
            </nav>
          </div>

          <div className="main-content-container container-fluid px-4">
            <div className="page-header row no-gutters py-4"></div>

            <div className="row mb-2">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#">CT</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#">Chest</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#">India</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#">4 Slice</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Information
                  </li>
                </ol>
              </nav>
            </div>

            <div className="row mb-2 top-category-wrap">
              <div className="col mb-4">
                <ul className="nav-item ">
                  <a
                    className="nav-link  text-nowrap px-3"
                    href="#"
                    onClick={() => {
                      setStartDateOpen(true);
                    }}
                  >
                    <span className="d-md-inline-block">Study Date</span>
                  </a>

                  <div className="dropdown-menu dropdown-menu-small"></div>
                </ul>
              </div>

              <div className="col mb-4">
                <ul className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle text-nowrap px-3"
                    data-toggle={"dropdown"}
                    href="#"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className="d-md-inline-block">Disease</span>
                  </a>
                  <form className="dropdown-menu dropdown-menu-small">
                    {arrDisease.map((element, index) => (
                      <div className="dropdown-item">
                        <div className="custom-control custom-checkbox mb-1">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id={"Disease" + (element.name ?? "")}
                            checked={element.check ?? false}
                            onChange={(e) => {
                              arrDisease[index].check = !arrDisease[index]
                                .check;
                              setArrDisease([...arrDisease]);
                              setChangeCheck(!changeCheck);
                            }}
                          ></input>
                          <label
                            className="custom-control-label"
                            htmlFor={"Disease" + (element.name ?? "")}
                          >
                            {element.name}
                          </label>
                        </div>
                      </div>
                    ))}
                  </form>
                </ul>
              </div>

              <div className="col mb-4">
                <ul className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle text-nowrap px-3"
                    data-toggle={"dropdown"}
                    href="#"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className="d-md-inline-block">Procedure</span>
                  </a>
                  <form className="dropdown-menu dropdown-menu-small">
                    {arrProcedure.map((element, index) => (
                      <div className="dropdown-item">
                        <div className="custom-control custom-checkbox mb-1">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id={"Procedure" + (element.name ?? "")}
                            checked={element.check ?? false}
                            onChange={(e) => {
                              arrProcedure[index].check = !arrProcedure[index]
                                .check;
                              setArrProcedure([...arrProcedure]);
                              setChangeCheck(!changeCheck);
                            }}
                          ></input>
                          <label
                            className="custom-control-label"
                            htmlFor={"Procedure" + (element.name ?? "")}
                          >
                            {element.name}
                          </label>
                        </div>
                      </div>
                    ))}
                  </form>
                </ul>
              </div>

              <div className="col mb-4">
                <ul className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle text-nowrap px-3"
                    data-toggle={"dropdown"}
                    href="#"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className="d-md-inline-block">
                      Technical Specifications
                    </span>
                  </a>
                  <form className="dropdown-menu dropdown-menu-small">
                    {arrTechnical.map((element, index) => (
                      <div className="dropdown-item">
                        <div className="custom-control custom-checkbox mb-1">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id={"Technical" + (element.name ?? "")}
                            checked={element.check ?? false}
                            onChange={(e) => {
                              arrTechnical[index].check = !arrTechnical[index]
                                .check;
                              setArrTechnical([...arrTechnical]);
                              setChangeCheck(!changeCheck);
                            }}
                          ></input>
                          <label
                            className="custom-control-label"
                            htmlFor={"Technical" + (element.name ?? "")}
                          >
                            {element.name}
                          </label>
                        </div>
                      </div>
                    ))}
                  </form>
                </ul>
              </div>

              <div className="col mb-4">
                <ul className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle text-nowrap px-3"
                    data-toggle={"dropdown"}
                    href="#"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className="d-md-inline-block">Bodypart</span>
                  </a>
                  <form className="dropdown-menu dropdown-menu-small">
                    {arrBodyPart.map((element, index) => (
                      <div className="dropdown-item">
                        <div className="custom-control custom-checkbox mb-1">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id={"Bodypart" + (element.name ?? "")}
                            checked={element.check ?? false}
                            onChange={(e) => {
                              arrBodyPart[index].check = !arrBodyPart[index]
                                .check;
                              setArrBodyPart([...arrBodyPart]);
                              setChangeCheck(!changeCheck);
                              setChangeBodyPart(!changeBodyPart);
                            }}
                          ></input>
                          <label
                            className="custom-control-label"
                            htmlFor={"Bodypart" + (element.name ?? "")}
                          >
                            {element.name}
                          </label>
                        </div>
                      </div>
                    ))}
                  </form>
                </ul>
              </div>
            </div>
            {arrElasticSearch.map((element, index) => (
              <div className="row">
                <div className="card card-small card-post card-post--aside card-post--1 search-item-wrap">
                  <div
                    className="card-post__image"
                    style={{
                      backgroundImage:
                        `url(${xray})`,
                    }}
                  >
                    <a
                      href="#"
                      className="card-post__category badge badge-pill badge-info"
                    >
                      {((element["_source"] ?? {})["tag"] ?? "").toUpperCase()}
                    </a>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">
                      <a className="text-fiord-blue" href="#">
                        {(element["_source"] ?? {})["title"] ?? ""}
                      </a>
                    </h5>
                    <p className="card-text d-inline-block mb-3">
                      {(element["_source"] ?? {})["description"] ?? ""}
                    </p>

                    <div className="list-tag-wrap">
                      <span className="text-muted">
                        <i
                          className={
                            (element["_source"] ?? {})["age"] ?? false
                              ? "fa fa-check"
                              : "fas fa-times"
                          }
                          aria-hidden="true"
                        ></i>
                        age
                      </span>
                      <span className="text-muted">
                        <i
                          className={
                            (element["_source"] ?? {})["gender"] ?? false
                              ? "fa fa-check"
                              : "fas fa-times"
                          }
                          aria-hidden="true"
                        ></i>
                        gender
                      </span>
                      <span className="text-muted">
                        <i
                          className={
                            (element["_source"] ?? {})["report"] ?? false
                              ? "fa fa-check"
                              : "fas fa-times"
                          }
                          aria-hidden="true"
                        ></i>
                        report
                      </span>
                      <span className="text-muted">
                        <i
                          className={
                            (element["_source"] ?? {})["study_date"] ?? false
                              ? "fa fa-check"
                              : "fas fa-times"
                          }
                          aria-hidden="true"
                        ></i>
                        study date
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <footer className="main-footer d-flex p-2 px-3 bg-white border-top">
            <ul className="nav">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Services
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Legal
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Terms of Service
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Privacy Policy
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  GDPR Policy
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Contact Us
                </a>
              </li>
            </ul>
            <span className="copyright ml-auto my-auto mr-2">
              Copyright © 2018
              <a href="#" rel="nofollow">
                DesignRevision
              </a>
            </span>
          </footer>
        </main>
      </div>
    </div>
  );
};
export default Dashboard;
