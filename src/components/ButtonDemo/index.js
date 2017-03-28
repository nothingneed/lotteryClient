/**
 *
 * Button.react.js
 *
 * A common button, if you pass it a prop "route" it'll render a link to a react-router route
 * otherwise it'll render a link with an onclick
 */

import React, { PropTypes, Children } from 'react';

import A from './A';
import StyledButton from './StyledButton';
import Wrapper from './Wrapper';

const Button = (props) =>{
  // Render an anchor tag
  let button = (
    <A href={props.href} onClick={props.onClick}>
      {Children.toArray(props.children)}
    </A>
  );
  // If the Button has a handleRoute prop, we want to render a button
  if (props.handleRoute) {
    button = (
      <StyledButton onClick={props.handleRoute}>
        {Children.toArray(props.children)}
      </StyledButton>
    );
  }

  return (
    <Wrapper>
      {button}
    </Wrapper>
  );
}
Button.propTypes = {
  handleRoute: PropTypes.func,          /**如果存在handleRoute, 则作为button渲染*/
  href: PropTypes.string,               /**如果不存在handleRoute, 则作为a元素渲染*/
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default Button;
