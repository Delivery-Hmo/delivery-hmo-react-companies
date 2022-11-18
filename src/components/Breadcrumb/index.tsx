
import { Breadcrumb as BreadcrumbAnt, Row } from 'antd';
import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { menuItems } from "../Menu/menuItems";

const Breadcrumb = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { icon, paths } = useMemo(() => {
    const paths = pathname.split("/");
    const pathIcon = "/" + paths[1];
    const icon = menuItems.find(mi => mi?.key === pathIcon)?.icon;
    paths.splice(0, 1);

    return {
      icon,
      paths
    }
  }, [pathname])

  const toPath = (path: string) => {
    const paths = pathname.split("/");
    const indexPath = paths.indexOf(path.toLowerCase().replaceAll(" ", "-"));
    const toPaths = paths.slice(0, indexPath + 1);
    toPaths.splice(0, 1);

    let to = "";

    toPaths.forEach((path) => {
      to += ("/" + path)
    });

    navigate(to);
  }

  return (
    <BreadcrumbAnt>
      <BreadcrumbAnt.Item>
        { icon }
      </BreadcrumbAnt.Item>
      {
        paths.map((path) => (
          <BreadcrumbAnt.Item 
            href="#"
            key={path}
            onClick={() => toPath(path)}
          >
            {path.charAt(0).toUpperCase() + path.slice(1)}
          </BreadcrumbAnt.Item>
        ))
      }
    </BreadcrumbAnt>
  )
}

export default Breadcrumb;