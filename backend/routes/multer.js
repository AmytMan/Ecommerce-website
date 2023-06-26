import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'D:\\ecommerce\\backend\\public');
    },
    filename: function(req, file, cb) {
        
        const filename = Date.now() + '_' + file.originalname;
        cb(null, filename, (err, success) => {
            if (err) throw err;
            
        });
    }
});

export default storage;
