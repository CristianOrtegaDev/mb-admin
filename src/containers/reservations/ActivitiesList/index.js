import React from 'react'
import { Container, ActivityContainer, ImageWrapper, Image, Name } from './styled'
import classNames from 'classnames'
import { Avatar } from '@material-ui/core'

const isSelected = (activity, selected) => selected && activity.id === selected.id

const ActivitiesList = ({ activities, onActivityClick, selected }) => (
  <Container className={classNames('portal-hide-scrollbars')}>
    {activities.map((activity, i) => (
      <ActivityContainer
        key={i}
        onClick={() => onActivityClick(activity)}
        selected={isSelected(activity, selected)}
      >
        {activity.avatar_url ? (
          <ImageWrapper>
            <Image src={activity.avatar_url} />
          </ImageWrapper>
        ) : (
          <Avatar
            style={{
              width: '35px',
              height: '35px',
              padding: '10px',
              background: '#1873f3'
            }}
          >
            {activity.description.charAt(0).toUpperCase()}
          </Avatar>
        )}
        <Name selected={isSelected(activity, selected)}>{activity.description}</Name>
      </ActivityContainer>
    ))}
  </Container>
)

export default ActivitiesList
