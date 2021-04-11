 /**
  * This is the navigation bar for chatbot-admin
  */
 import React from 'react';
 import {logoutAdmin} from "../queries/queries";
 import { NavLink} from "react-router-dom";
 import { makeStyles,useTheme } from '@material-ui/core/styles';
 import useMediaQuery from '@material-ui/core/useMediaQuery';
 import AppBar from '@material-ui/core/AppBar';
 import Toolbar from '@material-ui/core/Toolbar';
 import Typography from '@material-ui/core/Typography';
 import IconButton from '@material-ui/core/IconButton';
 import MenuIcon from '@material-ui/icons/Menu';
 import MenuItem from '@material-ui/core/MenuItem';
 import Menu from '@material-ui/core/Menu';
 
 const useStyles = makeStyles((theme) => ({
     root: {
       flexGrow: 1,
     },
     menuButton: {
       marginRight: theme.spacing(2),
     },
     title: {
       flexGrow: 1
     },
   }));
   
   function MenuAppBar() {
     const classes = useStyles();
     const [anchorEl, setAnchorEl] = React.useState(null);
     const openAnchor = Boolean(anchorEl);
     const theme = useTheme();
     const isMobile = useMediaQuery(theme.breakpoints.down("xs"));//Media Query for mobile versions.
   
     const handleMenu = (event) => {
       setAnchorEl(event.currentTarget);
     };
   
     const handleClose = () => {
         setAnchorEl(null); 
     };

     const handleLogout = () => {
         logoutAdmin().then((data)=>{
             if(data.logout === true){
                 window.location.reload();
             }
         }).catch((err)=>console.log(err));
     }
   
     return (
       <div className={classes.root}>
         <AppBar position="fixed" style={{background: 'black'}}>
           <Toolbar>
           <img src="groww_logo.png" alt="cannot be found" style={{maxWidth: "35px",marginRight: "1%"}}/>
             <Typography variant="h6" className={classes.title} style={{cursor:'pointer'}} onClick={()=>{window.location.reload()}}>
               Groww Admin Portal
             </Typography>
               <div>
                 {isMobile?
                     (
                     <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleMenu}>
                         <MenuIcon />
                     </IconButton>):
                     (
                       <>
                       <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                         <Typography><NavLink to="/add_faq" style={{textDecoration: "inherit",color: "inherit"}}>Add Faq</NavLink></Typography>
                       </IconButton>
                       <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                         <Typography><NavLink to="/add_category" style={{textDecoration: "white",color: "white"}}>Add Category</NavLink></Typography>
                       </IconButton>
                       <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleLogout}>
                         <Typography>Logout</Typography>
                       </IconButton>
                     </>
                     )}
                 <Menu
                   id="menu-appbar"
                   anchorEl={anchorEl}
                   anchorOrigin={{
                     vertical: 'top',
                     horizontal: 'right',
                   }}
                   keepMounted
                   transformOrigin={{
                     vertical: 'top',
                     horizontal: 'right',
                   }} 
                   open={openAnchor}
                   onClose={handleClose}
                 >
                   <NavLink to="/add_faq" style={{textDecoration: "none",color: "black"}}><MenuItem onClose={handleClose}>Add Faq</MenuItem></NavLink>
                   <NavLink to="/add_category" style={{textDecoration: "none",color: "black"}}><MenuItem onClose={handleClose}>Add Category</MenuItem></NavLink>
                   <MenuItem onClick={handleLogout} onClose={handleClose} style={{color: "black"}}>Logout</MenuItem>
                 </Menu>
               </div>
           </Toolbar>
         </AppBar>
       </div>
     );
   }
 
   export default MenuAppBar;