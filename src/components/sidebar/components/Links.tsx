/* eslint-disable */
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import DashIcon from "components/icons/DashIcon";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
// chakra imports

const CreateRouteLink = ({
  route,
  index,
}: {
  route: RoutesType;
  index: number;
}) => {
  const activeRoute = (routeName: string) => {
    return location.pathname.includes(routeName);
  };

  return (
    <Link key={index} to={route.layout + "/" + route.path}>
      <div className="relative mb-3 flex hover:cursor-pointer">
        <li
          className="my-[3px] flex cursor-pointer items-center px-8"
          key={index}
        >
          <span
            className={`${
              activeRoute(route.path) === true
                ? "font-bold text-brand-500 dark:text-white"
                : "font-medium text-gray-600"
            }`}
          >
            {route.icon ? route.icon : <DashIcon />}{" "}
          </span>
          <p
            className={`leading-1 ml-4 flex ${
              activeRoute(route.path) === true
                ? "font-bold text-navy-700 dark:text-white"
                : "font-medium text-gray-600"
            }`}
          >
            {route.name}
          </p>
        </li>
        {activeRoute(route.path) ? (
          <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-brand-500 dark:bg-brand-400" />
        ) : null}
      </div>
    </Link>
  );
};

const CreateDropDownRouterLink = ({
  route,
  index,
}: {
  route: RoutesType;
  index: number;
}) => {
  const activeRoute = (routeName: string) => {
    return location.pathname.includes(routeName);
  };
  const [onOpen, setOnOpen] = useState(false);
  const onDropDownClick = () => {
    setOnOpen(!onOpen);
  };

  const selectOptions = route.children.map((prop, index) => {
    return <CreateRouteLink route={prop} key={index} index={index} />;
  });
  return (
    <Link key={index} to={route.layout + "/" + route.path}>
      <div
        className="relative mb-3 flex hover:cursor-pointer"
        onClick={onDropDownClick}
      >
        <li
          className="my-[3px] flex cursor-pointer items-center px-8"
          key={index}
        >
          <span
            className={`${
              activeRoute(route.path) === true
                ? "font-bold text-brand-500 dark:text-white"
                : "font-medium text-gray-600"
            }`}
          >
            {route.icon ? route.icon : <DashIcon />}{" "}
          </span>
          <p
            className={`leading-1 ml-4 flex ${
              activeRoute(route.path) === true
                ? "font-bold text-navy-700 dark:text-white"
                : "font-medium text-gray-600"
            }`}
          >
            {route.name}
          </p>
          <ArrowDropDownRoundedIcon />
        </li>
        {activeRoute(route.path) ? (
          <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-brand-500 dark:bg-brand-400" />
        ) : null}
      </div>
      <ul className="ml-5" hidden={onOpen}>
        {selectOptions}
      </ul>
    </Link>
  );
};

export const SidebarLinks = (props: { routes: RoutesType[] }): JSX.Element => {
  const { routes } = props;

  const createLinks = (routes: RoutesType[]) => {
    const [onOpen, setOnOpen] = useState(false);
    const onDropDownClick = () => {
      setOnOpen(!onOpen);
    };
    return routes.map((route, index) => {
      if (route.layout === "/user") {
        if (route.children?.length) {
          return (
            <CreateDropDownRouterLink route={route} index={index} key={index} />
          );
        } else {
          return <CreateRouteLink route={route} key={index} index={index} />;
        }
      }
    });
  };
  // BRAND
  return <>{createLinks(routes)}</>;
};

export default SidebarLinks;
