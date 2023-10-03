function nativeTimingSafeEqual(a, b) {
    var strA = String(a);
    var strB = String(b);
    
    var len = Math.max(strA.length, strB.length);
    
    var bufA = bufferAlloc(len, strA, 'binary');
    var bufB = bufferAlloc(len, strB, 'binary');
    
    return crypto.timingSafeEqual(bufA, bufB);
}