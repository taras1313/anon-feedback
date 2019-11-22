import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loader = ({ height, width }) => {
	const useStyles = makeStyles(theme => ({
		root: {
			width: width || '100%',
			height: height || '100%',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			'& > * + *': {
				margin: 'auto'
			}
		}
	}));

	const classes = useStyles();

	return (
		<div className={classes.root}>
			<CircularProgress />
		</div>
	);
};

export default Loader;
