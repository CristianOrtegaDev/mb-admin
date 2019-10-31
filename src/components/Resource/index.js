import React from 'react'
import { Container, Row, Title, Subtitle, Content } from './styled'
import { Avatar, Grid } from '@material-ui/core'

const formatContent = content => (content.length > 36 ? `${content.substring(0, 36)}...` : content)

const Resource = ({
  title,
  onClick,
  subtitle,
  extraInfo,
  selected,
  avatar,
  withAvatar,
  avatarWithPadding,
  avatarCentered
}) => (
  <Container onClick={onClick} selected={selected}>
    {withAvatar ? (
      <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
        <Grid xs={2}>
          {avatar ? (
            <Avatar
              src={avatar}
              style={
                avatarWithPadding
                  ? {
                      background: '#1873f3',
                      width: '30px',
                      height: '30px',
                      padding: '10px',
                      marginLeft: avatarCentered ? 'auto' : '0px',
                      marginRight: 'auto'
                    }
                  : {
                      background: '#1873f3',
                      width: '45px',
                      height: '45px',
                      marginLeft: avatarCentered ? 'auto' : '0px',
                      marginRight: 'auto'
                    }
              }
            />
          ) : (
            <Avatar
              style={{ background: '#1873f3', width: '30px', height: '30px', padding: '10px' }}
            >
              {title.charAt(0).toUpperCase()}
            </Avatar>
          )}
        </Grid>
        <Grid xs={10}>
          <Row justify={'space-between'}>
            <Row>
              <Title>{title}</Title>
            </Row>
            <Subtitle>{extraInfo}</Subtitle>
          </Row>
          <Content>{formatContent(subtitle)}</Content>
        </Grid>
      </div>
    ) : (
      <div style={{ width: '100%' }}>
        <Row justify={'space-between'}>
          <Row>
            <Title>{title}</Title>
          </Row>
          <Subtitle>{extraInfo}</Subtitle>
        </Row>
        <Content>{formatContent(subtitle)}</Content>
      </div>
    )}
  </Container>
)

export default Resource
