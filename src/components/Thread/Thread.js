import React from 'react';
import { Icon, Button, Box } from '@material-ui/core';
import CommentMultipleOutline from 'mdi-material-ui/CommentMultipleOutline';
import ThumbDownOutline from 'mdi-material-ui/ThumbDownOutline';
import ThumbUpOutline from 'mdi-material-ui/ThumbUpOutline';
import { makeStyles } from '@material-ui/styles';

const getFormattedDate = (date) => {

  return `${date.toDateString().split(' ').slice(1).join(' ')}, ${date.getUTCHours()}:${date.getMinutes()}`
};

const useAnonButtonStyles = makeStyles({
  anonButton: {
    backgroundColor: props => props.backgroundColor || null,
    color: props => props.color,
    '&:hover': {
      backgroundColor: props => props.hoverBackgroundColor || null,
    },
    textTransform: 'unset',
    margin: '6px 6px 6px 0px',
    'box-shadow': 'none'
  },
});

const useButtonStyles = makeStyles({
  button: {
    margin: '6px 0 6px auto',
    textTransform: 'unset',
  }
})

function AnonButton(props) {
  const classes = useAnonButtonStyles(props);
  const {label, startIcon } = props;
  return (
    <Button
      variant="contained"
      color="primary"
      className={classes.anonButton}
      startIcon={startIcon}
      size='medium'
    >
      {label}
    </Button>
  );
}

export default function Thread({likes, dislikes, user: { username } = {}, creationDate, text, title }) {
  const classes = useButtonStyles();
  return (
    <Box
      maxWidth='800px' 
      width='80%'
      margin='0 auto'
      borderRadius='5px'
      border='1px solid lightgray'
    >
      <Box padding='20px 15px' display='flex' justifyContent='space-between'>
        <Box component='span' fontWeight='bold'>{username}</Box>
        <Box 
          component='span'
          fontWeight='200'
          fontStyle='italic'
          marginLeft='10px'
          color='grey'
        >
          {getFormattedDate(creationDate)}
        </Box>
      </Box>
      <Box 
        borderTop='1px solid lightgray'
        borderBottom='1px solid lightgray'
        padding='0 15px'
      >
        <Box component='h3' fontSize='24px' padding='10px 0px' margin='0' >{title}</Box>  
        <Box component='p' margin='0 0 10px 0'>{text}</Box>
      </Box>  
      <Box padding='5px 15px' display='flex'>
        <AnonButton
          backgroundColor='#62B8E8'
          hoverBackgroundColor='#0069B3'
          startIcon={<CommentMultipleOutline />}
          label='Comment'
        />
        <AnonButton 
          backgroundColor='#F29100'
          hoverBackgroundColor='#EA5B25'
          startIcon={<ThumbDownOutline />}
          label={dislikes || '0'}
        />
        <AnonButton 
          backgroundColor='#A9AA00'
          hoverBackgroundColor='#00e600'
          startIcon={<ThumbUpOutline />}
          label={likes || '0'}
        />
        <Button variant='outlined' className={classes.button}>
          Show Comments
        </Button>
      </Box>
    </Box>
  )
}
