import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import { ManipulateThreadComponent } from '../ManipulateThreadComponent';
import { connect } from 'react-redux';

import styles from './Header.module.scss';

const useStyles = makeStyles(theme => ({
	autocomplete: {
		input: {
			color: 'white',
			padding: '0'
		},
		inputRoot: {
			height: '100%'
		},
		label: {
			color: 'white'
		}
	},
	header: {
		backgroundColor: '#424b5f',
		display: 'flex',
		flexDirection: 'row',
		height: '70px',
		boxShadow: 'none'
	},
	headerPlaceholder: {
		width: '100%',
		height: '70px'
	},
	search: {
		position: 'relative',
		borderRadius: '5px',
		backgroundColor: '#424b5f',
		width: '100%',
		alignSelf: 'center'
	},
	inputInput: {
		padding: '0',
		paddingLeft: '50px',
		transition: theme.transitions.create('width'),
		width: '100%',
		height: '100%',
		'&:focus, &:hover': {
			backgroundColor: '#3a4357',
			borderRadius: '5px'
		}
	},

	searchIcon: {
		width: '48px',
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: 1
	},
	textField: {
		display: 'flex',
		color: 'white',
		height: '100%',
		width: '100%',
		'& input': {
			height: '100%',
			color: 'white',
			padding: '0 0 0 40px !important'
		},
		'& label': {
			color: 'white'
		}
	},
	labelRoot: {
		color: 'white'
	},
	createThreadButton: {
		backgroundColor: '#65c178',
		fontSize: '0.7rem',
		fontWeight: 'bold',
		color: 'white',
		'&:hover': {
			backgroundColor: '#159776'
		},
		width: '150px',
		height: '36px'
	}
}));

const SearchBar = ({ threads, ...props }) => {
	const classes = useStyles();

	return (
		<div className={styles.searchWrapper}>
			<div className={classes.search}>
				<div className={classes.searchIcon}>
					<SearchIcon />
				</div>
				<Autocomplete
					className={classes.autocomplete}
					freeSolo
					onChange={(e,a) => {console.log({e, a});props.history.push(`/feed/${a._id}`)}}
					classes={{
						inputRoot: classes.inputRoot
					}}
					autoSelect={true}
					options={threads}
					getOptionLabel={option => option.title}
					renderInput={params => (
						<TextField
							{...params}
							margin="none"
							variant="outlined"
							classes={{
								root: classes.textField
							}}
							fullWidth
						/>
					)}
					renderOption={option => (
						<div className={styles.link} to={`/feed/${option._id}`}>
							{option.title}
						</div>
					)}
				/>
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		threads: state.threadsReducer.threads
	};
};

const ConnectedSearchBar = connect(mapStateToProps)(SearchBar);

export default function ButtonAppBar(props) {
	console.log({props})
	const classes = useStyles();
	const [createThreadOpen, setCreateThreadOpen] = useState(false);

	const openCreateThread = () => setCreateThreadOpen(true);

	const closeCreateThread = () => setCreateThreadOpen(false);

	return (
		<>
			<AppBar position="fixed" className={classes.header}>
				<div className={styles.logoWrapper}>
					<img
						className={styles.logo}
						src="https://image.flaticon.com/icons/svg/2165/2165678.svg"
						alt="logo"
					/>
				</div>
				<ConnectedSearchBar history={props.history} />
				<div className={styles.createThreadWrapper}>
					<Button variant="contained" onClick={openCreateThread} className={classes.createThreadButton}>
						create thread
					</Button>
				</div>
			</AppBar>
			<ManipulateThreadComponent onClose={closeCreateThread} isOpen={createThreadOpen} action="create" />

			<div className={classes.headerPlaceholder} />
		</>
	);
}
