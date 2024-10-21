import footerImages from "../../../database/footer-img";

const Footer = () => {
     return (
       <>
         <footer>
           <div className="flex flex-wrap gap-2 content-center">
             {footerImages.map((img, i) => (
               <a key={`footer-img${i}`} href={img.link}>
                 <img
                   src={img.path}
                   alt={`dog${i}`}
                   className="w-[170px]"
                 />
               </a>
             ))}
           </div>
         </footer>
       </>
     );
}
export default Footer;