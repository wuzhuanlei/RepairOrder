import React from 'react';
import classNames from 'classnames';
import {ALL_REPAIRORDERS, INSERT_REPAIRORDER, UPDATE_REPAIRORDER} from '../common/constants';

const Menu = menu => {
    const nowShowing = menu.nowShowing;
    return (
        <footer className="menu">
            <ul className="menuUl">
                <li className="menuli">
                    <a href="#/" className={classNames({selected: nowShowing === ALL_REPAIRORDERS})}>
                        查询
                    </a>
                </li>
                {' '}
                <li className="menuli">
                    <a href="#/Insert" className={classNames({selected: nowShowing === INSERT_REPAIRORDER})}>
                        新增
                    </a>
                </li>
                {' '}
                {/*<li className="menuli">*/}
                    {/*<a href="#/ViewDetail/:id" className={classNames({selected: nowShowing === VIEW_REPAIRORDER_DETAIL})}>*/}
                        {/*查看详细*/}
                    {/*</a>*/}
                {/*</li>*/}
            </ul>
        </footer>
    );
};

export default Menu;